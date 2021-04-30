import { EntityManager } from "@mikro-orm/core";
import { Booking } from "../entities/Booking/Booking";
import Stripe from "stripe";

/**
 * Confirms a booking after the payment intent succeeds.
 * @param paymentIntent the payment intent attached to the booking
 * @param em mikroorm entity manager
 */
export const  ConfirmBooking = async (paymentIntent:Stripe.PaymentIntent, em: EntityManager) => {
    let id = paymentIntent.id;
    let booking = await em.findOne(Booking, {paymentIntentId: id})
    if(booking){
        booking.confirmBooking()
        await em.persistAndFlush(booking)
    } else {
        console.error("Unable to find booking for this payment id.")
    }
}