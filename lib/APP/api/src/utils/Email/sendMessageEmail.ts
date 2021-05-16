import { User } from '../../entities/User/User';
import { Listing } from '../../entities/Listing/Listing';
import {sendEmail} from './sendEmail'
import Mail from 'nodemailer/lib/mailer';

// TODO: Add more details in this email later on.
/**
 * Sends an email to another user about a listing.
 * @param from User that is sending this message.
 * @param to The user which this email will be sent to.
 * @param listing Listing which this message is being sent for.
 */
export const sendMessageEmail = async (from: User, to: User, listing: Listing) => {

    const message: Mail.Options = {
        from: '"Shareable Kitchen" <no-reply@shareablekitchen.com>',
        to: to.email,
        subject: `Shareable Kitchen - ${from.first_name} sent you a message about ${listing.title}`,
        text: `You got a new message from ${from.first_name} about ${listing.title}`,
        html: `<html>
                <body>
                <p>You have a new message!</p>
                <p>Go to shareablekitchen.com to check your inbox!</p>
                </body>
            </html>`
    };
    await sendEmail(message)
}