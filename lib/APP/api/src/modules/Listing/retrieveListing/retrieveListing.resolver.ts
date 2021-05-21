import { Listing } from "../../../entities/Listing/Listing"
import { MyContext } from "../../../types"
import { Arg, Ctx, Query } from "type-graphql"



export class RetrieveListingResolver {

    @Query(() => [Listing])
    async myListings(
        @Arg("input") id: string,
        @Ctx() {em}: MyContext
    ){
        return await em.findOneOrFail(Listing, {id})
    }
}

// /**
//  * Field resolver for availability attribute on the Listing class.
//  */
// @Resolver(() => Listing)
// export class AvailabilityResolver {
//     @FieldResolver(()=>Availability)
//     async availability(
//         @Root() listing: Listing,
//         @Ctx() {em}: MyContext
//     ): Promise<Availability> {
//         return await em.findOneOrFail(Availability, {listing})
//     }
// }