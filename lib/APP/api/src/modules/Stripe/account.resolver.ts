
import { User } from "../../entities/User/User";
import { Arg, Ctx, Field, InputType, Mutation, Query } from "type-graphql";
import { MyContext } from "../../types";
import { GraphQLJSON } from 'graphql-type-json';

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
        @Ctx() {em, user, stripe}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        if (!me.stripe_account_id) {
            throw new Error('Stripe account id does not exist.')
        }
        
        const account = await stripe.accounts.retrieve(me.stripe_account_id)

        return account
    }

    @Query(() => GraphQLJSON)
    async getExternalAccount(
        @Arg("input") accountId: string,
        @Ctx() {em, user, stripe}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        if (!me.stripe_account_id) {
            throw new Error('Stripe account id does not exist.')
        }
        return await stripe.accounts.retrieveExternalAccount(me.stripe_account_id, accountId)
    }

    @Query(() => GraphQLJSON)
    async listExternalAccounts(
        @Ctx() {em, user, stripe}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        if (!me.stripe_account_id) {
            throw new Error('Stripe account id does not exist.')
        }
        return await stripe.accounts.listExternalAccounts(me.stripe_account_id!)
    }

    @Query(() => GraphQLJSON)
    async getStripeAccountBalance(
        @Ctx() {em, user, stripe}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        if (!me.stripe_account_id) {
            throw new Error('Stripe account id does not exist.')
        }
        return await stripe.balance.retrieve({
            stripeAccount: me.stripe_account_id
        })
    }

    @Query(() => GraphQLJSON)
    async listPayouts(
        @Ctx() {em, user, stripe}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        if (!me.stripe_account_id) {
            throw new Error('Stripe account id does not exist.')
        }
        return await stripe.payouts.list({
            stripeAccount: me.stripe_account_id
        })
    }

    @Query(() => GraphQLJSON)
    async getPayout(
        @Arg("input") id: string,
        @Ctx() {em, user, stripe}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        if (!me.stripe_account_id) {
            throw new Error('Stripe account id does not exist.')
        }
        return await stripe.payouts.retrieve(id, {
            stripeAccount: me.stripe_account_id
        })
    }

    @Query(() => GraphQLJSON)
    async listBalanceTransactions(
        @Ctx() {em, user, stripe}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        if (!me.stripe_account_id) {
            throw new Error('Stripe account id does not exist.')
        }
        return await stripe.balanceTransactions.list({
            stripeAccount: me.stripe_account_id
        })
    }

    @Query(() => GraphQLJSON)
    async getBalanceTransaction(
        @Arg("input") id: string,
        @Ctx() {em, user, stripe}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        if (!me.stripe_account_id) {
            throw new Error('Stripe account id does not exist.')
        }
        return await stripe.balanceTransactions.retrieve(id, {
            stripeAccount: me.stripe_account_id
        })
    }


    @Query(() => GraphQLJSON, {description: "Account links allow you to onboard a user via stripe. https://stripe.com/docs/api/account_links"})
    async getAccountLink(
        @Arg("input") input: AccountLinkInput,
        @Ctx() {em, user, stripe}: MyContext
    ){
        let me = await em.findOneOrFail(User, {id: user?.sub})
        let link = await stripe.accountLinks.create({
            account: me.stripe_account_id!,
            type: "account_onboarding",
            refresh_url: input.refreshUrl,
            return_url: input.returnUrl,
        })
        return link
    }
    
}

export class AccountMutationResolvers {

    @Mutation(()=> GraphQLJSON)
    async updateStripeAccount(
        @Arg("input") account_token: string,
        @Ctx() {em, user, stripe}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        if (!me.stripe_account_id) {
            throw new Error('Stripe account id does not exist.')
        }
        
        const account = await stripe.accounts.update(me.stripe_account_id, {
            account_token
        })

        return account
    }

    @Mutation(()=> GraphQLJSON)
    async cancelPayout(
        @Arg("input") payout_id: string,
        @Ctx() {em, user, stripe}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        if (!me.stripe_account_id) {
            throw new Error('Stripe account id does not exist.')
        }
        
        const account = await stripe.payouts.cancel(payout_id)

        return account
    }

    @Mutation(()=> GraphQLJSON)
    async createExternalAccount(
        @Arg("input") external_account: string,
        @Ctx() {em, user, stripe}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        if (!me.stripe_account_id) {
            throw new Error('Stripe account id does not exist.')
        }
        
        const account = await stripe.accounts.createExternalAccount(me.stripe_account_id, {
            external_account
        })

        return account
    }

    @Mutation(()=> GraphQLJSON)
    async deleteExternalAccount(
        @Arg("input") external_account_id: string,
        @Ctx() {em, user, stripe}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        if (!me.stripe_account_id) {
            throw new Error('Stripe account id does not exist.')
        }
        
        const account = await stripe.accounts.deleteExternalAccount(external_account_id, me.stripe_account_id);

        return account
    }
    
}