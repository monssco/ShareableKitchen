import { Listing } from "../../../entities/Listing/Listing"
import { MyContext } from "../../../types"
import { Arg, Ctx, Query } from "type-graphql"



export class RetrieveListingResolver {

    @Query(() => Listing)
    async retrieveListing(
        @Arg("id") id: string,
        @Ctx() {em}: MyContext
    ){
        let listing = await em.findOneOrFail(Listing, {id})
        await listing.bookings.init({where: {confirmed: true}})
        return listing
    }
}

// /**
//  * Field resolver for availability attribute on the Listing class.
//  */
// @Resolver(() => Listing)
// export class CityResolver {
//     @FieldResolver(()=>City)
//     async availability(
//         @Root() listing: Listing,
//         @Ctx() {em}: MyContext
//     ): Promise<City> {
//         return await em.findOneOrFail(City, {id: listing.city.id})
//     }
// }