import { EntityManager } from "@mikro-orm/core";
import {CronJob} from 'cron';
import { subHours, subMonths } from "date-fns";
import { Booking } from "../entities/Booking/Booking";
import Stripe from "stripe";
import { AvailabilityType } from "../entities/Enums/AvailabilityType.enum";

/**
 * TODO: Test the logic of these functions.
 * Cron like scheduler that handles stripe transfers.
 * 
 * Main job is to take money from our stripe account and 
 * put it in the seller's stripe accounts (transfers).
 */
export class StripeTransferScheduler {

    em: EntityManager;
    stripe: Stripe;

    cronJob: CronJob;
    monthlyCronJob: CronJob;

    constructor(em: EntityManager, stripe: Stripe) {
        
        this.em = em;
        this.stripe = stripe;

        // production checks will be after 1 hour.
        // dev checks are every minute for quick debugging.
        let cronGlob = process.env.NODE_ENV === "production" ? "0 * * * *" : "0 * * * *"

        let monthlyCronGlob = process.env.NODE_ENV === "production" ? "0 * * * *" : "0 0 5 * *"

        this.cronJob = new CronJob(cronGlob, async () => {
            try {
                await this.checkTransfers();
            } catch (e) {
                console.error(e);
            }
        });

        // Start job
        if (!this.cronJob.running) {
            this.cronJob.start();
        }

        this.monthlyCronJob = new CronJob(monthlyCronGlob, async () => {
            try {
                await this.checkMonthlyTransfer();
            } catch (e) {
                console.error(e);
            }
        });

        // Start monthly job
        if (!this.monthlyCronJob.running) {
            this.monthlyCronJob.start();
        } 
    }

    /**
     * TODO: Test this with real data. I think this works but unsure about amounts.
     */
    /**
     * Checks to see which bookings need to paid out to the sellers.
     * 
     * $$ goes from OUR ACCOUNT -> SELLER STRIPE ACCOUNT
     */
    async checkTransfers() {

        console.log("RUNNING DAILY TRANSFER CHECKS")

        /**
        * 1. Get bookings that are confirmed and have null transfer ids.
        * 2. Create transfers using stripe and pay them out?
        * 3. After successful transfer, update the table with the id of the transfer.
         */

        let today = new Date()
        
        /**
         * Get bookings that:
         * 1. Have been confirmed, and paymentIntent is not null.
         * 2. Have no transfers. Transfers are empty.
         * 3. It has been more than 24 hours since the start date (meaning its the next day)
         */
        let bookings = await this.em.find(Booking, {
            transferId: [],
            paymentIntentId: {
                $ne: null
            }, 
            confirmed: true, 
            startDate: {
                $lte: subHours(today, 24)
            }})

        for (const eachBooking of bookings) {
            console.log(eachBooking)

            /**
             * The seller's fees are calculated earlier on.
             * Just need to subtract them from the total calculated amount.
             */
            let amountToBePaid = eachBooking.calculatedAmount - eachBooking.sellerAppFee
            
            const paymentIntent = await this.stripe.paymentIntents.retrieve(eachBooking.paymentIntentId!)


            // We know for a fact that this payment has been confirmed.
            // Thanks for the stripe webhook.
            const transfer = await this.stripe.transfers.create({
                currency: eachBooking.listing.city.state.country.currency,
                amount: amountToBePaid,
                destination: eachBooking.listing.author.stripe_account_id!,
                // Gets the last charge that was added to this payment intent.
                source_transaction: paymentIntent.charges.data[paymentIntent.charges.data.length - 1].id
            })

            eachBooking.transferId.push(transfer.id); 

            await this.em.persistAndFlush(eachBooking)
        }

    }

    /**
     * TODO: test this.
     * 
     * Monthly function that runs once a month for subscription based
     * bookings. It makes sure that sellers get paid out on the 5th of each month.
     * 
     */
    async checkMonthlyTransfer() {
        
        console.log("RUNNING MONTHLY TRANSFER CHECKS")

        let today = new Date()
        /**
         * Get bookings that are 
         * 1. Monthly
         * 2. Paid for
         * 3. Not yet cancelled (ended), their end date is still in the future.
         * 4. Start dates for them were a month ago.
         */
        let bookings = await this.em.find(Booking, {
            type: {
                $eq: AvailabilityType.monthly,
            }, 
            paymentIntentId: {
                $ne: null
            }, 
            // They must have subscriptions.
            subscriptionId: {
                $ne: null
            },
            confirmed: true, 
            // Start date is at least 1 month ago. TODO: Test this.
            startDate: {
                $lte: subMonths(today, 1)
            },
            // End date is in the future.
            endDate: {
                $gte: today
            }
        })

        // Here are all the bookings we found. 
        // Iterate through them and pay people out one by one.
        for (const eachBooking of bookings) {
            console.log(eachBooking)

            /**
             * The seller's fees are calculated earlier on.
             * Just need to subtract them from the total calculated amount.
             */
            let amountToBePaid = eachBooking.calculatedAmount - eachBooking.sellerAppFee
            
            const paymentIntent = await this.stripe.paymentIntents.retrieve(eachBooking.paymentIntentId!)


            // We know for a fact that this payment has been confirmed.
            // Thanks to the stripe webhook
            const transfer = await this.stripe.transfers.create({
                currency: eachBooking.listing.city.state.country.currency,
                amount: amountToBePaid,
                destination: eachBooking.listing.author.stripe_account_id!,
                // Gets the last charge that was added to this payment intent.
                source_transaction: paymentIntent.charges.data[paymentIntent.charges.data.length - 1].id
            })

            eachBooking.transferId.push(transfer.id); 

            await this.em.persistAndFlush(eachBooking)
        }
    }
}
