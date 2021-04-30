import { Arg, Ctx, Field, InputType, Mutation, Query } from "type-graphql";
import { MyContext } from "../../types";
import { GraphQLJSON } from 'graphql-type-json';
import { getStripeAccountId } from "./helper";

@InputType()
class AccountLinkInput {
    @Field()
    refreshUrl: string

    @Field()
    returnUrl: string
}


export class AccountQueryResolvers {

    @Query(()=> GraphQLJSON)
    async getStripeAccount(
        @Ctx() {user, stripe}: MyContext
    ) {
        const account_id = await getStripeAccountId(user)

        const account = await stripe.accounts.retrieve(account_id)
        return account
    }

    @Query(() => GraphQLJSON)
    async getStripeAccountBalance(
        @Ctx() {user, stripe}: MyContext
    ) {
        const account_id = await getStripeAccountId(user)
        return await stripe.balance.retrieve({
            stripeAccount: account_id
        })
    }


    @Query(() => GraphQLJSON, {description: "Account links allow you to onboard a user via stripe. https://stripe.com/docs/api/account_links"})
    async getAccountLink(
        @Arg("input") input: AccountLinkInput,
        @Ctx() {user, stripe}: MyContext
    ){
        const account_id = await getStripeAccountId(user)
        let link = await stripe.accountLinks.create({
            account: account_id,
            type: "account_onboarding",
            refresh_url: input.refreshUrl,
            return_url: input.returnUrl,
        })
        return link
    }

    @Mutation(()=> GraphQLJSON)
    async updateStripeAccount(
        @Arg("input") account_token: string,
        @Ctx() {user, stripe}: MyContext
    ) {
        const account_id = await getStripeAccountId(user)
        
        const account = await stripe.accounts.update(account_id, {
            account_token
        })

        return account
    }
    
}