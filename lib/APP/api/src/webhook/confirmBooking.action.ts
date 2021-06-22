import { EntityManager } from "@mikro-orm/core";
import { AvailabilityType } from "../entities/Enums/AvailabilityType.enum";
import Stripe from "stripe";
import { Booking } from "../entities/Booking/Booking";
import { addMonths, getUnixTime, startOfMonth } from "date-fns";
import { User } from "../entities/User/User";
import { sendBookingConfirmationEmail } from "../utils/Email/sendBookingConfirmationEmail";
import { sendReservationConfirmationEmail } from "../utils/Email/sendReservationConfirmationEmail";

//TODO: Test this class, the code looks good but I have not tested it yet.


/**
 * Confirms a booking after the payment intent succeeds.
 * Also creates subscriptions for monthly bookings. (if the booking is monthly)
 * @param paymentIntent the payment intent attached to the booking
 * @param em mikroorm entity manager
 */
export const  ConfirmBooking = async (paymentIntent:Stripe.PaymentIntent, em: EntityManager, stripe: Stripe) => {

    // This metadata has been added when the booking was created.
    let booking_id = paymentIntent.metadata['booking_id']

    try {
        em.clear()
        // Find the booking, get listing and buyer too.
        let booking = await em.findOneOrFail(Booking, {id: booking_id}, ['buyer', 'listing.author'])

        // Confirm the booking, they have paid for it already.
        booking.confirmBooking()
        await em.persistAndFlush(booking)

        // Sent async, don't wait on it.
        sendBookingConfirmationEmail(booking.buyer, booking);
        sendReservationConfirmationEmail(booking.listing.author, booking);

        // If its monthly booking that spans more than 2 months, setup a subscription.
        // If it is for a single month, ignore it
        if (booking.type === AvailabilityType.monthly && booking.unitQuantity > 1) {
            let buyer = await em.findOneOrFail(User, {id: booking.buyer.id})
            // Create monthly subscription.
            await createMonthlySubscription(stripe, booking, buyer, paymentIntent.id, em )
        }

        console.log("Successfully confirmed booking!")

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

        console.log("Setup monthly subscription")

        // We attach the payment method of the payment intent (that the 
        // buyer has already paid with and has succeeded) to charge for 
        // the recurring subscriptions.

        // Expand on the payment_method, since we need the id.
        let paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
            expand: ["payment_method"]
        })

        // Only ask them to pay the monthly amount only,
        // dont attach any fees.
        let monthlyAmount = booking.unitPrice

        // We make a price for this listing and just for this booking.
        let price = await stripe.prices.create({
            unit_amount: monthlyAmount,
            // currency: expandedBooking.listing.city.state.country.currencySymbol, TODO: Fix this once you upgrade to mikroorm v5.
            currency: 'cad',
            recurring: {
                interval: 'month', 
                interval_count: 1
            },
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

        // let thisMonth = addMonths(expandedBooking.startDate, 0)
        // let firstOfThisMonth = startOfMonth(thisMonth)

        // The last day of the subscription.
        // let lastDay = booking.endDate

        let payment_method = paymentIntent.payment_method as Stripe.PaymentMethod

        // TODO: Subscriptions are not quite right. 
        // Maybe use subscription scheduleuer?
        // https://github.com/stripe/stripe-java/issues/454
        // 

        let subscription = await stripe.subscriptionSchedules.create({
            customer: buyer.stripe_customer_id!,
            start_date: getUnixTime(firstOfNextMonth),
            phases: [
                {
                    items: [
                        {
                            price: price.id,
                            quantity: 1,
                            
                        }
                    ],
                    default_payment_method: payment_method.id,
                    iterations: booking.unitQuantity - 1 // 1 month is already paid for
                }
            ]
        })
        // let subscription = await stripe.subscriptions.create({
        //     customer: buyer.stripe_customer_id!,
        //     off_session: true,
        //     items: [
        //         {
        //             price: price.id
        //         }
        //     ],
        //     // We want it to cycle on the first of each month.
        //     billing_cycle_anchor: getUnixTime(firstOfNextMonth),
        //     cancel_at: getUnixTime(lastDay),
        //     // Use the payment method from the paid out payment intent that was just processed.
        //     default_payment_method: payment_method.id
        // })

        booking.subscriptionId = subscription.id
        await em.persistAndFlush(booking)
}