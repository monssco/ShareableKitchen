import GraphQLJSON from "graphql-type-json"
import { MyContext } from "src/types"
import { Arg, Ctx, Mutation, Query } from "type-graphql"
import { getStripeAccountId } from "./helper"



export class ExternalAccountResolver {

    @Query(() => GraphQLJSON)
    async getExternalAccount(
        @Arg("input") externalAccountId: string,
        @Ctx() { user, stripe}: MyContext
    ) {
        const account_id = await getStripeAccountId(user);
        return await stripe.accounts.retrieveExternalAccount(account_id, externalAccountId)
    }

    @Query(() => GraphQLJSON)
    async listExternalAccounts(
        @Ctx() {user, stripe}: MyContext
    ) {
        const account_id = await getStripeAccountId(user);
        return await stripe.accounts.listExternalAccounts(account_id)
    }

    @Mutation(()=> GraphQLJSON)
    async createExternalAccount(
        @Arg("input") external_account: string,
        @Ctx() {user, stripe}: MyContext
    ) {
        const account_id = await getStripeAccountId(user);
        
        
        const account = await stripe.accounts.createExternalAccount(account_id, {
            external_account
        })

        return account
    }

    @Mutation(()=> GraphQLJSON)
    async deleteExternalAccount(
        @Arg("input") external_account_id: string,
        @Ctx() {user, stripe}: MyContext
    ) {
        const account_id = await getStripeAccountId(user);
        
        const account = await stripe.accounts.deleteExternalAccount(account_id, external_account_id);

        return account
    }
}