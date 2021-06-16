// This is the heart of the entire calculation limbo.

import { differenceInCalendarDays, differenceInCalendarWeeks } from "date-fns";
import { Booking } from "../../../entities/Booking/Booking";
import { AvailabilityType } from "../../../entities/Enums/AvailabilityType.enum";

interface input {
    type: AvailabilityType,
    startDate: Date,
    endDate: Date,
    unitPrice: number
}

export const calculateAmount = ({
    type,
    startDate,
    endDate,
    unitPrice
}: input) => {
    
        var amount = 0;

        let unitQuantity = 0;

        // They will all have to pay right off the bat anyways.
        // The differences in subscriptions are handled by the webhook and cron job.
        if (type === AvailabilityType.daily){
            // Find the difference in the number of days for $ calculation.
            // The days returned need to be incremented by 1. why??
            const numDays = Math.abs(differenceInCalendarDays(endDate, startDate)) + 1

            // Amount to charge the buyer. (Person creating this booking)
            amount = numDays * unitPrice

            unitQuantity = numDays
        } else if (type === AvailabilityType.weekly) {

            // Calculate the number of weeks and multiply by unit price.
            // Ask them to pay upfront.
            const numWeeks = Math.abs(differenceInCalendarWeeks(endDate, startDate))

            amount = numWeeks * unitPrice 

            unitQuantity = numWeeks
        } else if (type === AvailabilityType.monthly) {
            // In monthly scenario, we do not charge them for all the months at once.
            // They pay for the first month and the rest of the amount is setup as a subscription model.
            // const numMonths = Math.abs(differenceInCalendarMonths(input.endDate, input.startDate))

            // Only a single month is asked to be paid.
            amount = 1 * unitPrice;

            unitQuantity = 1
        } else {
            throw new Error("Availability type must be either daily, weekly or monthly.")
        }


        // apply the buyer fees. We will absorb the platform fees.
        let buyerAppFee = Math.round((Booking.BUYER_PERCENTAGE / 100) * amount)

        console.log("Buyer", buyerAppFee)
        console.log("amount", amount)

        let sellerAppFee = Math.round((Booking.SELLER_PERCENTAGE / 100) * amount)

        return {
            amount,
            buyerAppFee,
            sellerAppFee,
            unitQuantity
        }
}