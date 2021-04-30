import { Listing } from "../../entities/Listing/Listing"
import { MyContext } from "../../types"
import { Arg, Ctx, Mutation} from "type-graphql"


export class DeleteListingResolver {

    @Mutation(() => Boolean)
    async deleteMyListing(
        @Arg("id") id: string,
        @Ctx() {em, user}: MyContext
    ) {
        const dbUser = user
        const listing = await em.findOneOrFail(Listing, {id: id})
        if (listing.author != dbUser) {
            throw Error('Not your listing >:(')
        }
        listing.active = false

        await em.persistAndFlush(listing)

        return true
    }
}