import GraphQLJSON from "graphql-type-json"
import { MyContext } from "src/types"
import { Query, Ctx, Arg, Mutation } from "type-graphql"
import { getStripeCustomerId } from "./helper"
import Stripe from 'stripe';

// @InputType()
// class UpdatePaymentMethodInput {
//     @Field(()=> Stripe.PaymentMethodsResource, {nullable: true})
//     params: Stripe.PaymentMethodUpdateParams

//     @Field()
//     paymentMethodId: string
// }

/**
 * https://stripe.com/docs/api/payment_methods
 */
export class PaymentMethodsResolver {

    @Mutation(() => GraphQLJSON)
    async attachPaymentMethod(
        @Arg("input") paymentMethodId: string,
        @Ctx() {user, stripe}: MyContext
    ) {
        const customer_id = await getStripeCustomerId(user);
        return await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customer_id
        })
    }

    @Mutation(() => GraphQLJSON)
    async detachPaymentMethod(
        @Arg("input") paymentMethodId: string,
        @Ctx() {stripe}: MyContext
    ) {
        
        return await stripe.paymentMethods.detach(paymentMethodId)
    }

    @Query(()=> GraphQLJSON)
    async listPaymentMethods(
        @Arg("input") type: Stripe.PaymentMethodListParams.Type,
        @Ctx() {user, stripe}: MyContext
    ) {
        const customer_id = await getStripeCustomerId(user)
        return await stripe.paymentMethods.list({
            customer: customer_id,
            type
        })
    }

    @Query(()=> GraphQLJSON)
    async retrievePaymentMethod(
        @Arg("input") paymentMethodId: string,
        @Ctx() {stripe}: MyContext
    ) {
        return await stripe.paymentMethods.retrieve(paymentMethodId)
    }

    // TODO: come back to this when you have a better way of taking user input.
    // @Mutation(() => GraphQLJSON)
    // async updatePaymentMethod(
    //     @Arg("input") {paymentMethodId}: UpdatePaymentMethodInput,
    //     @Ctx() {stripe}: MyContext
    // ) {
    //     await stripe.paymentMethods.update(paymentMethodId)
    // }
}