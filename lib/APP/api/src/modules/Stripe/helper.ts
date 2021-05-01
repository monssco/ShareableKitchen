import { User } from "src/entities/User/User";

/**
 * Get user's stripe account id.
 * @param user entity used to fetch the stripe id from
 * @returns string of the stripe id
 */
export const getStripeAccountId = async (user: User): Promise<string> => {
    
    if (!user.stripe_account_id) {
        throw new Error('Stripe account id does not exist.')
    }

    return user.stripe_account_id
}

/**
 * Get user's strpe customer id
 * @param user entity used to fetch the stripe id from
 * @returns string of the stripe id
 */
export const getStripeCustomerId = async (user: User): Promise<string> => {

    if (!user.stripe_customer_id) {
        throw new Error('Stripe account id does not exist.')
    }
    
    return user.stripe_customer_id
}