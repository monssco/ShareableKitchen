import { EntityManager } from "@mikro-orm/core";
import { AvailabilityType } from "../entities/Enums/AvailabilityType.enum";
import Stripe from "stripe";
import { Booking } from "../entities/Booking/Booking";
import { addMonths, getUnixTime, startOfMonth } from "date-fns";
import { User } from "../entities/User/User";

//TODO: Test this class, the code looks good but I have not tested it yet.


/**
 * Confirms a booking after the payment intent succeeds.
 * Also creates subscriptions for monthly bookings. (if the booking is monthly)
 * @param paymentIntent the payment intent attached to the booking
 * @param em mikroorm entity manager
 */
export const  ConfirmBooking = async (paymentIntent:Stripe.PaymentIntent, em: EntityManager, stripe: Stripe) => {

    // This metadata has been added when the booking was created.
    let booking_type = paymentIntent.metadata['booking_type']
    let listing_id = paymentIntent.metadata['listing_id']
    let buyer_id = paymentIntent.metadata['buyer_id']

    try {
        // Find the booking.
        let booking = await em.findOneOrFail(Booking, {listing: {id: listing_id},type: booking_type, buyer: {id: buyer_id}})

        // Confirm the booking, they have paid for it already.
        booking.confirmBooking()
        await em.persistAndFlush(booking)

        // If its monthly booking, setup a subscription.
        if (booking.type === AvailabilityType.monthly) {
            let buyer = await em.findOneOrFail(User, {id: buyer_id})
            await createMonthlySubscription(stripe, booking, buyer, paymentIntent.id, em )
        }

    } catch (error) {
        console.error("ERROR", error)
    }
}

/**
 * Sets up the user on a monthly subscription.
 * Only if they signed up for a monthly booking.
 * @param stripe stripe instance
 * @param booking booking that was created
 * @param buyer person doing the buying
 * @param paymentIntentId payment intent that the buyer paid using their card
 * @param em entity manager for updating the booking.
 */
const createMonthlySubscription =
    async (stripe: Stripe, booking: Booking, buyer: User, paymentIntentId: string, em: EntityManager ) => {

        // We attach the payment method of the payment intent (that the 
        // buyer has already paid with and has succeeded) to charge for 
        // the recurring subscriptions.

        // Expand on the payment_method, since we need the id.
        let paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
            expand: ["payment_method"]
        })

        // We make a price for this listing and just for this booking.
        let price = await stripe.prices.create({
            unit_amount: booking.calculatedAmount,
            currency: booking.listing.city.state.country.currencySymbol,
            recurring: {interval: 'month'},
            product_data: {
                name: `Shareable Kitchen - ${booking.listing.title} - ${booking.listing.id}`,
                statement_descriptor: `Shareable Kitchen`,
                metadata: {
                    listing_id: booking.listing.id,
                    start_date: booking.startDate.toUTCString(),
                    end_date: booking.endDate.toUTCString(),
                    booking_id: booking.id,
                }
            }
        });

        // Get next month from the start date of the booking.
        // Since they have already paid for the first month, we will skip
        // this month.
        let nextMonth = addMonths(booking.startDate, 1)

        // Get the first day of that next month.
        let firstOfNextMonth = startOfMonth(nextMonth)

        // The last day of the subscription.
        let lastDay = booking.endDate

        let payment_method = paymentIntent.payment_method as Stripe.PaymentMethod

        let subscription = await stripe.subscriptions.create({
            customer: buyer.stripe_customer_id!,
            application_fee_percent: 10,
            off_session: true,
            items: [
                {
                    price: price.id
                }
            ],
            // We want it to cycle on the first of each month.
            billing_cycle_anchor: getUnixTime(firstOfNextMonth),
            cancel_at: getUnixTime(lastDay),
            // Use the payment method from the paid out payment intent that was just processed.
            default_payment_method: payment_method.id
        })

        booking.subscriptionId = subscription.id
        await em.persistAndFlush(booking)
}