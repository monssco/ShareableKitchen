import { Arg, Ctx, Mutation, Query } from "type-graphql";
import { MyContext } from "../../types";
import { GraphQLJSON } from 'graphql-type-json';
import { getStripeCustomerId } from "./helper";





export class CustomerResolver {

    @Query(()=> GraphQLJSON)
    async getStripeCustomer(
        @Ctx() {user, stripe}: MyContext
    ) {
        const customer_id = await getStripeCustomerId(user);
        return await stripe.customers.retrieve(customer_id);
    }

    /**
     * TODO: Something to keep in mind.
     * We are simply getting card objects over here
     * A better way would be to get all the enums from stripe
     * and then use those to populate the method.
     */
    @Query(() => GraphQLJSON)
    async listPaymentMethods(
        @Ctx() {user, stripe}: MyContext
    ) {;
        const customer_id = await getStripeCustomerId(user);

        return await stripe.paymentMethods.list({
            customer: customer_id,
            type: "card"
        })
    }

    @Mutation(() => GraphQLJSON)
    async attachPaymentMethod(
        @Arg("input") id: string,
        @Ctx() {user, stripe}: MyContext
    ) {
        const customer_id = await getStripeCustomerId(user);
        return await stripe.paymentMethods.attach(id, {
            customer: customer_id
        })

    }

    @Mutation(() => GraphQLJSON)
    async detachPaymentMethod(
        @Arg("input") id: string,
        @Ctx() {stripe}: MyContext
    ) {
        return await stripe.paymentMethods.detach(id)
    }

    // These methods above are too mundane and will need too much
    // work, so for now you can use stripe checkout to add payment methods.
    //TODO: Attaching new payment methods should be done via stripe checkout.
    // https://stripe.com/docs/payments/checkout
    // const sd = await stripe.checkout.sessions.create({
    //         customer:buyer.stripe_customer_id,
    //         cancel_url: input.cancelUrl,
    //         success_url: input.successUrl,
    //         payment_method_types: ['card'],
    //         mode: 'setup'
            
    //     })

    //     console.log("SD", sd)
}