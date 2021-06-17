import { AvailabilityType } from "src/graphql/generated/graphql";

export const availabilityTypeToString = (type: AvailabilityType) => {
    if (type === AvailabilityType.Daily) {
        return "day"
    } else if (type === AvailabilityType.Weekly) {
        return "week"
    } else if (type === AvailabilityType.Monthly) {
        return "month"
    }
    
    return "NaN"
}

export const availabilityStringToType = (type: string) => {
    if (type === AvailabilityType.Daily) {
        return AvailabilityType.Daily
    } else if (type === AvailabilityType.Weekly) {
        return AvailabilityType.Weekly
    } else {
        return AvailabilityType.Monthly
    }
}

/**
 * Converts whole amount to decimal points
 * @param amount in whole number eg 1000
 * @returns 10.00
 */
export const toDecimalCurrency = (amount: number) => {
    return (Math.round(amount * 100) / 10000).toFixed(2)
}

/**
 * Converts decimal amount to whole amount for the backend.
 * @param amount decimal amount eg 10.00
 * @returns 1000
 */
export const toWholeCurrency = (amount: number) => {
    return Math.round(amount * 100)
}