
import { User } from "../../entities/User/User";
import { Ctx, Query } from "type-graphql";
import { MyContext } from "../../types";
import { GraphQLJSON } from 'graphql-type-json';



export class AccountResolver {

    @Query(()=> GraphQLJSON)
    async getStripeAccount(
        @Ctx() {em, user, stripe}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        if (!me.stripe_account_id) {
            throw new Error('Stripe account id does not exist.')
        }
        
        const account = await stripe.accounts.retrieve(me.stripe_account_id)

        return account
    }
}