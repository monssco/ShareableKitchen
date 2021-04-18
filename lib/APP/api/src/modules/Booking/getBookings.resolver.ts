import { Booking } from "../../entities/Booking/Booking";
import { MyContext } from "../../types";
import { Ctx, Query, Resolver } from "type-graphql";



@Resolver()
export class GetBookingsResolver {

    @Query(() => [Booking])
    async getBookings(
        @Ctx() {em, user}: MyContext
    ): Promise<Booking[]> {

        return await em.find(Booking, {buyer: {id: user?.sub}})

    }
}