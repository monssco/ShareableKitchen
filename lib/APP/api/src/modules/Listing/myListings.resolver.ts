import { Listing } from "../../entities/Listing/Listing"
import { MyContext } from "../../types"
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql"
import { Availability } from "../../entities/Availability"
import { PaginationInput } from "../Base/pagination.resolver"
import { FindOptions } from "@mikro-orm/core"


export class MyListingResolver {

    @Query(() => [Listing])
    async myListings(
        @Arg("input") input: PaginationInput,
        @Ctx() {em, user}: MyContext
    ){
        /**
         * First get the user from the database.
         * Then fetch all their listings.
         */
        const dbUser = user

        const options: FindOptions<Listing> = {
            limit: input.limit,
            offset: input.offset,
            orderBy: {
                created: 'asc'
            }
        }
        
        return await em.find(Listing, {author: dbUser, active: true}, options)
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