import { AvailabilityType } from "src/graphql/generated/graphql";

export const availabilityTypeToString = (type: AvailabilityType) => {
    if (type === AvailabilityType.Daily) {
        return "day"
    } else if (type === AvailabilityType.Weekly) {
        return "week"
    } else {
        return "month"
    }
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

export const fromBackendMoney = (amount: number) => {
    return (Math.round(amount * 100) / 10000).toFixed(2)
}

export const toBackendMoney = (amount: number) => {
    Math.round(amount * 100)
}