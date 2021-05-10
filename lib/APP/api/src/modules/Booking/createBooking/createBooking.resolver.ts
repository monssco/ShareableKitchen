import { Booking } from "../../../entities/Booking/Booking";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import { MyContext } from "../../../types";
import { Listing } from "../../../entities/Listing/Listing";
import { Availability } from "../../../entities/Availability/Availability";
import { differenceInCalendarDays, differenceInCalendarWeeks } from 'date-fns'
import { AvailabilityType } from "../../../entities/Enums/AvailabilityType.enum";

@InputType()
class CreateBookingInput {
    @Field()
    listingId!: string

    @Field()
    startDate!: Date

    @Field()
    endDate!: Date

    @Field(() => AvailabilityType)
    type!: AvailabilityType
}

@ObjectType()
class CreateBookingReturn {
    @Field()
    bookingId: string

    @Field()
    paymentIntentSecret: string
}

/**
 * When you create a booking, there are a few things that happen.
 * 1. We make sure that there are no other overlapping bookings.
 * 2. We make sure that you can have a payment intent created on your account
 * 3. We make sure that you can afford to pay for it (otherwise people will just book and then not pay)
 * 
 * We return the booking id (which was just created) and and the paymentIntent secret for the payment that must be made for it to be confirmed.
 * Using that payment intent, we can confirm the booking (via webhook ) once the buyer has paid for it.
 */
@Resolver(() => CreateBookingReturn)
export class CreateBookingResolver {


    @Mutation(()=> CreateBookingReturn)
    async createBooking(
        @Arg("input") input: CreateBookingInput,
        @Ctx() {em, user, stripe}: MyContext
    ): Promise<CreateBookingReturn> {
        let buyer = user;
        let listing = await em.findOneOrFail(Listing, {id: input.listingId})
        let availability = await em.findOneOrFail(Availability, {listing})

        // Make sure that the requested dates are within the available dates.
        if (input.startDate.getTime() < availability.startDate.getTime() || input.endDate.getTime() > availability.endDate.getTime() ) {
            throw new Error("This location is not available for these specified dates.")
        }

        // Get all the other bookings to ensure there are no overlapping bookings.
        // Make sure they are indeed confirmed and not just sitting around.
        const bookings = await em.find(Booking, {listing, confirmed: true})

        var overlap = false
        for (const a of bookings) {
            console.log("Check")
            console.log(a)
            overlap = (a.startDate <= input.endDate) && (a.endDate >= input.startDate)
        }

        if(overlap) {
            throw new Error('New booking date overlaps pre-existing booking.')
        }

        var amount = 0;

        // They will all have to pay right off the bat anyways.
        // The differences in subscriptions are handled by the webhook and cron job.
        if (input.type === AvailabilityType.daily){
            // Find the difference in the number of days for $ calculation.
            // The days returned need to be incremented by 1. why??
            const numDays = Math.abs(differenceInCalendarDays(input.endDate, input.startDate))

            // Amount to charge the buyer. (Person creating this booking)
            amount = numDays * listing.unitPrice
        } else if (input.type === AvailabilityType.weekly) {

            // Calculate the number of weeks and multiply by unit price.
            // Ask them to pay upfront.
            const numWeeks = Math.abs(differenceInCalendarWeeks(input.endDate, input.startDate))

            amount = numWeeks * listing.unitPrice 
        } else if (input.type === AvailabilityType.monthly) {
            // In monthly scenario, we do not charge them for all the months at once.
            // They pay for the first month and the rest of the amount is setup as a subscription model.
            // const numMonths = Math.abs(differenceInCalendarMonths(input.endDate, input.startDate))

            // Only a single month is asked to be paid.
            amount = 1 * listing.unitPrice;
        } else {
            throw new Error("Availability type must be either daily, weekly or monthly.")
        }


        // apply the 10% buyer fees. We will absorb the platform fees.
        let buyerPercentage = 10;
        let buyerAppFee = (buyerPercentage / 100) * amount
        
        const calculatedAmount = buyerAppFee + amount;

        let sellerPercentage = 3;
        let sellerAppFee = (sellerPercentage / 100) * amount

        
        const paymentIntent = await stripe.paymentIntents.create({
            payment_method_types: ['card'],
            amount: calculatedAmount,
            currency: 'cad',
            customer: buyer.stripe_customer_id,
            description: `Shareable Kitchen - ${listing.title} - ${listing.id}`,
            statement_descriptor: `Shareable Kitchen`,
            metadata: {
                booking_type: input.type,
                listing_id: listing.id,
                buyer_id: buyer.id
            }
        })

        const booking = new Booking(input.type, listing, buyer, input.startDate, input.endDate, listing.unitPrice, calculatedAmount, buyerAppFee, sellerAppFee)
        
        booking.paymentIntentId = paymentIntent.id

        if(!paymentIntent.client_secret) {
            throw new Error("Payment intent doesn't have a secret. Please contact us asap! (587) 609-7008")
        }

        await em.persistAndFlush(booking)

        return {
            bookingId: booking.id,
            paymentIntentSecret: paymentIntent.client_secret
        }
    }

}