/**
 * This is where the webhook will reside.
 * Do everything related to webhook in here.
 */

import express from 'express';
const router = express.Router();

import {ConfirmBooking} from './confirmBooking.action';

// This is required since the signature is treated as a buffer
// by stripe's sdk.
// https://github.com/stripe/stripe-node/issues/341
router.use(express.raw({type: "*/*"}));

import { getOrm } from '../utils/createDatabaseConn';

//TODO: Move these stripe imports and keys the server class and pass them in somehow, they don't need
// to be here


// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51IhXgtGZgehPj4cv80xEq7vmSZm6r3fXZs6yxY9Syb22IALSmftnkxFNyRnWkClLgijH1D50hE8QKhSS95hJQaj100AQh0EX6v', {
    apiVersion: '2020-08-27',
});

// If you are testing your webhook locally with the Stripe CLI you
// can find the endpoint's secret by running `stripe listen`
// Otherwise, find your endpoint's secret in your webhook settings in the Developer Dashboard
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET || 'whsec_zIVnFqunSxGySFKehhsSVlrHz8YgiIxk';


router.post('/', async (request, response) => {

    // copied from: https://stripe.com/docs/webhooks/signatures
    const sig = request.headers['stripe-signature'] as string;
    
    try {
        let event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        // Handle the event
        switch (event.type) {
            // When a user has successfully paid for their booking.
            case 'payment_intent.succeeded':
                const stripeObject: Stripe.PaymentIntent = event.data.object as Stripe.PaymentIntent;
                console.log(`💰 PaymentIntent status: ${stripeObject.status}`);
                const orm = await getOrm();
                ConfirmBooking(stripeObject, orm.em)
                const paymentIntent = event.data.object;
                console.log(typeof paymentIntent)
                console.log('PaymentIntent was successful!');
            break;
            // ... handle other event types
            default:
            console.log(`Unhandled event type ${event.type}`);
        }

        response.json({received: true})
    }
    catch (err) {
        console.log("Error", err);
        response.status(400).send(`Webhook Error: ${err.message}`);
    }
})



export default router;