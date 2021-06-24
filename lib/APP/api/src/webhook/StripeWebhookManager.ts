/**
 * This is where the webhook will reside.
 * Do everything related to webhook in here.
 */

import express from 'express';
const router = express.Router();
// This is required since the signature is treated as a buffer
// by stripe's sdk.
// https://github.com/stripe/stripe-node/issues/341
//@ts-ignore
router.use(express.raw({type: "*/*"}));

import {ConfirmBooking} from './confirmBooking.action';
import Stripe from 'stripe';
import { EntityManager } from '@mikro-orm/core';


export class StripeWebhookManager {

    private em: EntityManager;
    private stripe: Stripe;
    private webhookEndpointSecret: string;

    //TODO: Register webhook in here.
    constructor(em: EntityManager, stripe: Stripe, webhookEndpointSecret: string) {
        this.em = em;
        this.stripe = stripe;
        this.webhookEndpointSecret = webhookEndpointSecret;

        // this.registerWebhook(stripe)
        
        
    }

    // async registerWebhook(stripe: Stripe) {
    //     console.log("Register webhook")
    //     await stripe.webhookEndpoints.create({
    //         url: '',
    //         enabled_events: ['*'],
    //         connect: true,
    //         description: 'Auto registered webhook endpoint by express.',
    //         metadata: {
    //             created: new Date().toISOString()
    //         }
    //     })
    // }

    getWebHookRouter(): express.IRouter {
        
        return router.post('/', async (request, response) => {

            // copied from: https://stripe.com/docs/webhooks/signatures
            const sig = request.headers['stripe-signature'] as string;
            
            try {
                let event = this.stripe.webhooks.constructEvent(request.body, sig, this.webhookEndpointSecret);
                // Handle the event
                switch (event.type) {
                    // When a user has successfully pays for their booking
                    // We come in here and confirm it for them.
                    case 'payment_intent.succeeded':
                        const stripeObject: Stripe.PaymentIntent = event.data.object as Stripe.PaymentIntent;
                        console.log(`💰 PaymentIntent status: ${stripeObject.status}`);

                        ConfirmBooking(stripeObject, this.em, this.stripe)
                        console.log('PaymentIntent was successful!');
                    break;
                    // ... handle other event types
                    default:
                    console.log(`Unhandled event type ${event.type}`)
                    // console.log(event.data)
                }

                response.json({received: true})
            }
            catch (err) {
                console.log("Error", err);
                response.status(400).send(`Webhook Error: ${err.message}`);
            }
        })
    }
}