import { Booking } from "../../entities/Booking/Booking";
import { MyContext } from "../../types";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { FindOptions } from "@mikro-orm/core";
import { PaginationInput } from "../Base/pagination.resolver";

/**
 * Reservations are retrieved by sellers.
 * They have reservations made on their listings by the buyers.
 * Buyers on the other hand will retrieve Bookings.
 */
@Resolver()
export class ListReservationsResolver {

    @Query(() => [Booking])
    async listReservations(
        @Arg("input") input: PaginationInput,
        @Ctx() {em, user}: MyContext
    ): Promise<Booking[]> {

        const options: FindOptions<Booking> = {
            limit: input.limit,
            offset: input.offset,
            orderBy: {
                created: 'ASC'
            }
        }

        return await em.find(Booking, {listing: {author: user}, confirmed: true}, options)
    }
}