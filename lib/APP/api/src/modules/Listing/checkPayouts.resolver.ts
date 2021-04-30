import { MyContext } from "src/types";
import { Ctx, Query, Resolver } from "type-graphql";


@Resolver()
export class CheckPayoutsEnabled {

    @Query(() => Boolean, {description: "This endpoint is used to check if an account has payouts enabled. If payouts are not enabled, they must enable them by following the by using the getAccountLink endpoint."})
    async arePayoutsEnabled(
        @Ctx() {user, stripe}: MyContext
    ) {
        let me = user

        let account = await stripe.accounts.retrieve(me.stripe_account_id!)

        return account.charges_enabled
    }
}