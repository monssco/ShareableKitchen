import { EntityManager } from "@mikro-orm/core";
import {CronJob} from 'cron';
import { subHours } from "date-fns";
import { Booking } from "../entities/Booking/Booking";
import Stripe from "stripe";

/**
 * Cron like scheduler that handles stripe transfers.
 */
export class StripeTransferScheduler {

    cronJob: CronJob;
    em: EntityManager;
    stripe: Stripe;

    constructor(em: EntityManager, stripe: Stripe) {
        
        this.em = em;
        this.stripe = stripe;

        // production checks will be after 1 hour.
        // dev checks are every minute for quick debugging.
        let cronGlob = process.env.NODE_ENV === "production" ? "0 * * * *" : "1 * * * * *"

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
    }

    /**
     * TODO: Test this with real data. I think this works but unsure about amounts.
     */
    /**
     * 1. Get bookings that are confirmed and have null transfer ids.
     * 2. Create transfers using stripe and pay them out?
     * 3. After successful transfer, update the table with the id of the transfer.
     */
    async checkTransfers() {
        console.log("running transfer check")
        // Get all bookings that hav been paid for by the buyer,
        // have not been paid out, but are confirmed and
        // their its been more than 24 hours since their start date.
        let bookings = await this.em.find(Booking, {transferId: null, paymentIntentId: {
            $ne: null
        }, confirmed: true, startDate: {
            $lte: subHours(new Date(), 24)
        }})
        console.log("found bookings with null id")

        for (const eachBooking of bookings) {
            console.log(eachBooking)
            let totalAmount = eachBooking.calculatedAmount

            /**
             * The seller's fees are calculated earlier on.
             * Just need to subtract them from the total calculated amount.
             */
            let amountToBePaid = totalAmount - eachBooking.sellerAppFee
            
            const paymentIntent = await this.stripe.paymentIntents.retrieve(eachBooking.paymentIntentId!)


            const transfer = await this.stripe.transfers.create({
                currency: eachBooking.listing.city.state.country.currency,
                amount: amountToBePaid,
                destination: eachBooking.listing.author.stripe_account_id!,
                source_transaction: paymentIntent.charges.data[0].id
            })

            eachBooking.transferId = transfer.id

            await this.em.persistAndFlush(eachBooking)
        }

    }
}
