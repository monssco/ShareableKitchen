

/**
 * Going to come back to this.
 * A user can book a listing.
 * When a listing is being booked, it should check to make sure that 
 * conflicting bookings don't exist.
 */

import { Booking } from "../../entities/Booking/Booking";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { MyContext } from "../../types";
import { Listing } from "../../entities/Listing/Listing";
import { User } from "../../entities/User/User";
import { Availability } from "../../entities/Availability";
import { differenceInCalendarDays } from 'date-fns'

@InputType()
class CreateBookingInput {
    @Field()
    listingId!: string

    @Field()
    startDate!: Date

    @Field()
    endDate!: Date
}

@Resolver(() => Booking)
export class CreateBookingResolver {


    @Mutation(()=> Booking)
    async createBooking(
        @Arg("input") input: CreateBookingInput,
        @Ctx() {em, user, stripe}: MyContext
    ): Promise<Booking> {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        const listing = await em.findOneOrFail(Listing, {id: input.listingId})
        const availability = await em.findOneOrFail(Availability, {listing})

        // Make sure that the requested dates are within the available dates.
        if (input.startDate.getTime() < availability.startDate.getTime() || input.endDate.getTime() > availability.endDate.getTime() ) {
            throw new Error("This location is not available for these specified dates.")
        }

        // Get all the other bookings to ensure there are no overlapping bookings.
        const bookings = await em.find(Booking, {listing})

        var overlap = false
        for (const a of bookings) {
            console.log("Check")
            console.log(a)
            overlap = (a.startDate <= input.endDate) && (a.endDate >= input.startDate)
        }

        console.log(overlap)
        if(overlap) {
            throw new Error('New booking date overlaps pre-existing booking.')
        }

        // Find the difference in the number of days for $ calculation.
        const numDays = differenceInCalendarDays(input.startDate, input.endDate)

        // Amount to charge the buyer. (Person creating this booking)
        const amount = numDays * listing.price

        /**
         * TODO: calculate application fees here.
         */
        const stripeResponse = await stripe.charges.create({
            customer: me.stripe_customer_id,
            currency: listing.city.state.country.currency,
            amount,
            description: `Booking for ${listing.title}`,
            destination: {
                account: listing.author.stripe_account_id!,
                amount
            }
        })
        

        const booking = new Booking(listing, me, input.startDate, input.endDate, new Date(), stripeResponse.id )

        await em.persistAndFlush(booking)

        return booking
    }

}