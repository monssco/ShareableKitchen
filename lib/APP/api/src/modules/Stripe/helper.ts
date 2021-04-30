import { User } from "src/entities/User/User";

export const getStripeAccountId = async (user: User): Promise<string> => {
    
    if (!user.stripe_account_id) {
        throw new Error('Stripe account id does not exist.')
    }

    return user.stripe_account_id
}

export const getStripeCustomerId = async (user: User): Promise<string> => {

    if (!user.stripe_account_id) {
        throw new Error('Stripe account id does not exist.')
    }
    
    return user.stripe_account_id
}