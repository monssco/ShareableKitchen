import { Booking } from "../../../entities/Booking/Booking";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import { MyContext } from "../../../types";
import { Listing } from "../../../entities/Listing/Listing";
import { Availability } from "../../../entities/Availability/Availability";
import { AvailabilityType } from "../../../entities/Enums/AvailabilityType.enum";
import { calculateAmount } from "./calculateAmount";

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

    @Field()
    cancelUrl!: string

    @Field()
    successUrl!: string
}

@ObjectType()
class CreateBookingReturn {
    @Field()
    booking!: Booking

    /**
     * Used by stripejs in the frontend.
     */
    @Field()
    sessionId!: string
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
        console.log("HERE")
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
            overlap = (a.startDate <= input.endDate) && (a.endDate >= input.startDate)
        }

        if(overlap) {
            throw new Error('New booking date overlaps pre-existing booking.')
        }

        const {amount, buyerAppFee, sellerAppFee, unitQuantity} = calculateAmount({
            type: input.type,
            startDate: input.startDate,
            endDate: input.endDate,
            unitPrice: listing.unitPrice
        })

        const booking = new Booking(input.type, listing, buyer, input.startDate, input.endDate, listing.unitPrice, unitQuantity, amount, buyerAppFee, sellerAppFee)

        //TODO: You can also use checkout to make subscriptions,
        // check to see if subscriptions can be made for monthly
        // bookings here or not. If this is possible, you can get rid
        // of the logic in the backend.

        //TODO: Add images from s3 in here.
        const session = await stripe.checkout.sessions.create({
            customer:buyer.stripe_customer_id,
            cancel_url: input.cancelUrl,
            success_url: input.successUrl,
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    //TODO: change currency based on the buyer's location?
                    currency: 'cad',
                    amount: (amount + buyerAppFee),
                    name: listing.title,
                    description: listing.description,
                    images: ['https://images.unsplash.com/photo-1556911220-bff31c812dba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a2l0Y2hlbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'],
                    quantity: 1 // TODO: do something with quantity, if it can be moved then do so, I don't know how this works with connect but having a quantity on a time period seems off.
                }
            ],
            payment_intent_data: {
                // This data is required by the webhook.
                metadata: {
                    booking_id: booking.id
                },
                // For monthly payments, we can charge their card later on.
                // So it uses 'off_session'
                setup_future_usage: booking.type === AvailabilityType.monthly ? 'off_session' : 'on_session'
            },
            client_reference_id: booking.id
        })

        console.log(session)

        booking.paymentIntentId = session.payment_intent?.toString()

        await em.persistAndFlush(booking)

        return {
            booking,
            sessionId: session.id
        }
    }

}