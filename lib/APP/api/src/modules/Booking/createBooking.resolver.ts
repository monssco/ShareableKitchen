

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

        // Calculate that there is no overlapping booking
        // Calculate how much it will cost, do the payment? then store it all?
        // 

        stripe.charges.create({
            customer: me.stripe_customer_id,
            currency: listing.city.state.country.currency,
            
        })

        const booking = new Booking(listing, me, input.startDate, input.endDate, new Date(), "test?" )

        await em.persistAndFlush(booking)

        return booking
    }

}