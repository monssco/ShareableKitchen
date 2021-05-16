import { User } from '../../entities/User/User';
import {sendEmail} from './sendEmail'
import Mail from 'nodemailer/lib/mailer';
import { Booking } from '../../entities/Booking/Booking';
import {ics} from 'calendar-link'

// TODO: Add more details in this email later on.
/**
 * Sends an email to the buyer, after a booking is confirmed.
 * @param to The user which this email will be sent to.
 * @param booking The booking.
 */
export const sendBookingConfirmationEmail = async (to: User, booking: Booking) => {

    const event = {
        title: `Shareable Kitchen - ${booking.listing.title}`,
        description: `Your booking is confirmed! If you need assistance, please react out to us at help@shareablekitchen.com. The kitchen is located at ${booking.listing.address} ${booking.listing.unitPrice}`,
        start: booking.startDate,
        end: booking.endDate
    };

    let iCalEvent = ics(event)

    const message: Mail.Options = {
        from: '"Shareable Kitchen" <no-reply@shareablekitchen.com>',
        to: to.email,
        subject: `Your booking is confirmed! - Shareable Kitchen `,
        text: `Your booking is confirmed!`,
        html: `<html>
                <body>
                    <p>Congrats on your booking!</p>
                    <p>Thank you for confirming your booking.</p>
                    <p>Here are the details!</p>
                    <p>Start: ${booking.startDate}</p>
                    <p>End: ${booking.endDate}</p>
                    <p>Location: ${booking.listing.address} ${booking.listing.unitPrice}</p>
                </body>
            </html>`,
        icalEvent: {
            filename: 'invitation.ics',
            method: 'request',
            content: iCalEvent
        }
    };
    await sendEmail(message)
}