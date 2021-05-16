import {sendEmail} from './sendEmail'

/**
 * Sends a welcome email to a new user.
 * @param to email address to send the email to.
 */
export const sendRegistrationEmail = async (to: string) => {

    const message = {
        from: '"Shareable Kitchen" <no-reply@shareablekitchen.com>',
        to,
        subject: "Welcome to Shareable Kitchen!",
        text: "Welcome to shareablekitchen.com!",
        html: `<html>
            <body>
            <p>Testing SparkPost - the world's most awesome email service!</p>
            </body>
            </html>`
    };
    await sendEmail(message)
}