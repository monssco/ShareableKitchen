import { Booking } from "../../entities/Booking/Booking";
import { MyContext } from "../../types";
import { Ctx, Query, Resolver } from "type-graphql";


@Resolver()
export class GetReservationsResolver {

    @Query(() => [Booking])
    async getReservations(
        @Ctx() {em, user}: MyContext
    ): Promise<Booking[]> {
        return await em.find(Booking, {listing: {author: {id: user?.sub}}})
    }
}