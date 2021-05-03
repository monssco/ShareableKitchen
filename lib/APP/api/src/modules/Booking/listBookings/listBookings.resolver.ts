import { Booking } from "../../../entities/Booking/Booking";
import { MyContext } from "../../../types";
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { PaginationInput } from "../../Base/pagination.resolver";
import { FindOptions } from "@mikro-orm/core";
import { Listing } from "../../../entities/Listing/Listing";
// import { Listing } from "../../entities/Listing/Listing";


/**
 * Bookings are retrieved by the buyers.
 * This is essentially the time that they have decided to book for on a given listing.
 */
@Resolver()
export class ListBookingsResolver {

    @Query(() => [Booking])
    async listBookings(
        @Arg("input") input: PaginationInput,
        @Ctx() {em, user}: MyContext
    ): Promise<Booking[]> {

        const options: FindOptions<Booking> = {
            limit: input.limit,
            offset: input.offset,
            orderBy: {
                created: 'ASC'
            },
        }
        options
        
        /**
         * Only show confirmed bookings.
         */
        const bookings = await em.find(Booking, {buyer: user, confirmed: true})

        return bookings

    }
}

/**
 * Field resolver for Listings attribute on the Booking class.
 */
@Resolver(() => Booking)
export class BookingResolver {
    @FieldResolver(() => Listing)
    async listing(
        @Root() booking: Booking,
        @Ctx() {em}: MyContext
    ): Promise<Listing> {
        return await em.findOneOrFail(Listing, {id: booking.listing.id})
    }
}