
import { User } from "../../entities/User/User";
import { Arg, Ctx, Mutation, Query } from "type-graphql";
import { MyContext } from "../../types";
import { GraphQLJSON } from 'graphql-type-json';





export class CustomerResolver {

    @Query(()=> GraphQLJSON)
    async getStripeCustomer(
        @Ctx() {em, user, stripe}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        if (!me.stripe_customer_id) {
            throw new Error('Stripe account id does not exist.')
        }
        
        return await stripe.customers.retrieve(me.stripe_customer_id)
    }

    /**
     * TODO: Something to keep in mind.
     * We are simply getting card objects over here
     * A better way would be to get all the enums from stripe
     * and then use those to populate the method.
     */
    @Query(() => GraphQLJSON)
    async getPaymentMethods(
        @Ctx() {em, user, stripe}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        if (!me.stripe_customer_id) {
            throw new Error('Stripe account id does not exist.')
        }

        return await stripe.paymentMethods.list({
            customer: me.stripe_customer_id,
            type: "card"
        })

    }

    @Mutation(() => GraphQLJSON)
    async attachPaymentMethod(
        @Arg("input") id: string,
        @Ctx() {em, user, stripe}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        if (!me.stripe_customer_id) {
            throw new Error('Stripe account id does not exist.')
        }

        return await stripe.paymentMethods.attach(id, {
            customer: me.stripe_customer_id
        })

    }

    @Mutation(() => GraphQLJSON)
    async detachPaymentMethod(
        @Arg("input") id: string,
        @Ctx() {em, user, stripe}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        if (!me.stripe_customer_id) {
            throw new Error('Stripe account id does not exist.')
        }

        return await stripe.paymentMethods.detach(id)
    }
}