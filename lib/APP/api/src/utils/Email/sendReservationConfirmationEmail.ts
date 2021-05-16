import { User } from '../../entities/User/User';
import {sendEmail} from './sendEmail'
import Mail from 'nodemailer/lib/mailer';
import { Booking } from '../../entities/Booking/Booking';
import {ics} from 'calendar-link'

// TODO: Add more details in this email later on.
/**
 * Send an email to the author of a listing. Tell them that they have a new booking.
 * @param to The user which this email will be sent to.
 * @param booking The booking in question.
 */
export const sendReservationConfirmationEmail = async (to: User, booking: Booking) => {

    const event = {
        title: `Shareable Kitchen - ${booking.listing.title}`,
        description: "A new reservation has been made on your kitchen! If you need assistance, please react out to us at help@shareablekitchen.com",
        start: booking.startDate,
        end: booking.endDate
    };

    let iCalEvent = ics(event)

    const message: Mail.Options = {
        from: '"Shareable Kitchen" <no-reply@shareablekitchen.com>',
        to: to.email,
        subject: `A new reservation has been created! - Shareable Kitchen `,
        text: `A new reservation has been created on your listing!`,
        html: `<html>
                <body>
                    <p>You have a new reservation for your kitchen!</p>
                    <p>Here are the details</p>
                    <p>Start date ${booking.startDate}</p>
                    <p>End date ${booking.endDate}</p>
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