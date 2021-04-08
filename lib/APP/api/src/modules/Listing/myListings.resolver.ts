import { Listing } from "../../entities/Listing/Listing"
import { User } from "../../entities/User/User"
import { MyContext } from "src/types"
import { Arg, Ctx, Field, InputType, Int, Query } from "type-graphql"

@InputType()
class ListingsInput {
    @Field(() => Int)
    first?: number

    @Field(() => Int)
    limit?: number

}

export class MyListingResolver {

    @Query(() => [Listing])
    async myListings(
        @Arg("input", {nullable: false}) input: ListingsInput,
        @Ctx() {em, user}: MyContext
    ){
        const dbUser = await em.findOneOrFail(User, {id: user?.sub})
        const listings = await em.find(Listing, {author: dbUser}, {limit: input.limit, offset: input.limit})

        return listings
    }
}