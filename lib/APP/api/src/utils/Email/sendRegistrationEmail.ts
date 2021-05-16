import Mail from 'nodemailer/lib/mailer';
import {sendEmail} from './sendEmail'

/**
 * Sends a welcome email to a new user.
 * @param to email address to send the email to.
 */
export const sendRegistrationEmail = async (to: string) => {

    const message: Mail.Options = {
        from: '"Shareable Kitchen" <no-reply@shareablekitchen.com>',
        to,
        subject: "Welcome to Shareable Kitchen!",
        text: "Welcome to Shareable Kitchen!",
        html: `<html>
                    <body>
                    <p>Welcome to Shareable Kitchen!</p>
                    </body>
                </html>`
    };
    await sendEmail(message)
}