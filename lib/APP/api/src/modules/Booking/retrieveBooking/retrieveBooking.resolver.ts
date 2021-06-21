import { Booking } from "../../../entities/Booking/Booking";
import { MyContext } from "../../../types";
import { Arg, Ctx, Query, Resolver } from "type-graphql";

/**
 * Gets a single booking.
 */
@Resolver()
export class RetrieveBookingResolver {

    @Query(() => Booking)
    async retrieveBooking(
        @Arg("id") id: string,
        @Ctx() {em, user}: MyContext
    ): Promise<Booking> {
        
        /**
         * Only show confirmed bookings.
         */
        const booking = await em.findOneOrFail(Booking, {id}, ['listing.author'])
        if(user.id !== booking.buyer.id || user.id != booking.listing.author.id) {
            throw new Error("Unauthorized >:(")
        }
        return booking

    }
}