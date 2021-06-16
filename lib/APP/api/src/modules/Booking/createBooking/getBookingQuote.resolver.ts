import { Booking } from "../../../entities/Booking/Booking";
import { Arg, Ctx, Field, InputType, Query, Resolver } from "type-graphql";
import { MyContext } from "../../../types";
import { Listing } from "../../../entities/Listing/Listing";
import { AvailabilityType } from "../../../entities/Enums/AvailabilityType.enum";
import { calculateAmount } from "./calculateAmount";

@InputType()
class getBookingQuoteInput {
    @Field()
    listingId!: string

    @Field()
    startDate!: Date

    @Field()
    endDate!: Date

    @Field(() => AvailabilityType)
    type!: AvailabilityType
}

/**
 * This resolver is only used for getting quotes for set days.
 * We don't write any data to the database, this is simply to estimate how much a booking might cost.
 */
@Resolver(() => Booking)
export class GetBookingQuoteResolver {


    @Query(()=> Booking)
    async getBookingQuote(
        @Arg("input") input: getBookingQuoteInput,
        @Ctx() {em, user}: MyContext
    ): Promise<Booking> {
        console.log("HERE")
        let buyer = user;
        let listing = await em.findOneOrFail(Listing, {id: input.listingId})

        const {amount, buyerAppFee, sellerAppFee, unitQuantity} = calculateAmount({
            type: input.type,
            startDate: input.startDate,
            endDate: input.endDate,
            unitPrice: listing.unitPrice
        })

        const booking = new Booking(input.type, listing, buyer, input.startDate, input.endDate, listing.unitPrice, unitQuantity, amount, buyerAppFee, sellerAppFee)

        return booking
    }

}