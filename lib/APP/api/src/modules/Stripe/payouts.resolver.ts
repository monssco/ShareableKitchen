import GraphQLJSON from "graphql-type-json"
import { MyContext } from "src/types"
import { Query, Ctx, Arg, Mutation } from "type-graphql"
import { getStripeAccountId } from "./helper"


export class PayoutResolver {

    @Query(() => GraphQLJSON)
    async getPayout(
        @Arg("input") id: string,
        @Ctx() {user, stripe}: MyContext
    ) {
        return await stripe.payouts.retrieve(id, {
            stripeAccount: await getStripeAccountId(user)
        })
    }

    @Query(() => GraphQLJSON)
    async listPayouts(
        @Ctx() {user, stripe}: MyContext
    ) {
        
        return await stripe.payouts.list({
            stripeAccount: await getStripeAccountId(user)
        })
    }

    // doesn't this need the ccount? not secure...
    @Mutation(()=> GraphQLJSON)
    async cancelPayout(
        @Arg("input") payout_id: string,
        @Ctx() {stripe}: MyContext
    ) {
        
        const account = await stripe.payouts.cancel(payout_id)

        return account
    }
}