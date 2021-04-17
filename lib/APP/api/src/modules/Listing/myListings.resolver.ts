import { Listing } from "../../entities/Listing/Listing"
import { User } from "../../entities/User/User"
import { MyContext } from "../../types"
import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql"
import { Availability } from "../../entities/Availability"


export class MyListingResolver {

    @Query(() => [Listing])
    async myListings(
        @Ctx() {em, user}: MyContext
    ){
        /**
         * First get the user from the database.
         * Then fetch all their listings.
         * 
         * TODO: Add arguments for pagination of listings.
         */
        const dbUser = await em.findOneOrFail(User, {id: user?.sub})
        const listings = await em.find(Listing, {author: dbUser, active: true})
        return listings
    }
}

/**
 * Field resolver for availability attribute on the Listing class.
 */
@Resolver(() => Listing)
export class AvailabilityResolver {
    @FieldResolver(()=>Availability)
    async availability(
        @Root() listing: Listing,
        @Ctx() {em}: MyContext
    ): Promise<Availability> {
        return await em.findOneOrFail(Availability, {listing})
    }
}