import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';
import { parseISO, eachDayOfInterval, format, isMonday, isSunday, isFirstDayOfMonth, isLastDayOfMonth, compareAsc, addMonths } from 'date-fns';
import React from 'react';
import { AvailabilityType, Listing } from 'src/graphql/generated/graphql';

import {useRouter} from 'next/router'
import { graphqlSDK } from 'src/graphql/client';
import { availabilityStringToType, availabilityTypeToString, toDecimalCurrency } from 'src/utils/helpers';
import Warning from '../Alert/warning';
import Info from '../Alert/info';

// API and examples
// https://reactdatepicker.com/
/**
 * Big screen, shows a date picker for start date and a date picker for end date
 * Smaller screens, shows 
 * @param listing 
 * @returns 
 */
const Calendar: React.FC<Listing> = (listing: Listing) => {

    const router = useRouter();

    const reserveListing = () => {
        // Should take you to booking page with this info.
        if(startDate && endDate) {
            router.push(`/book?listingId=${listing.id}&startDate=${format(startDate, 'MM-dd-yyyy')}&endDate=${format(endDate, 'MM-dd-yyyy')}&type=${listing.availability.type}`)
        } else {
            //TODO: Show error
        }
    }

        const PriceSummary = () => {
        return (
            <div>
                {/* 11.23 x 3 days for example */}
                <div className="flex flex-row py-2 justify-between">
                    <p>${toDecimalCurrency(listing.unitPrice)} x {price?.unitQuantity} {availabilityTypeToString(listing.availability.type)}{price?.unitQuantity! > 1 ? 's': ''}</p>
                    <p>${toDecimalCurrency(price?.amount!)}</p>
                </div>
                <div className="flex flex-row py-2 justify-between">
                    <p>Service Fee</p>
                    <p>${toDecimalCurrency(price?.fees!)}</p>
                </div>
                <div className="flex flex-row py-2 justify-between font-medium">
                    <p>Total</p>
                    <p>${toDecimalCurrency(price?.total!)}</p>
                </div>

                <div className={`${(price?.unitQuantity! > 1 && listing.availability.type === AvailabilityType.Monthly) ? 'block' : 'hidden'}`}>
                    <Info text={"You will only be charged for the first month. The remaining balance will be deduced on 1st of each subsequent month."}/>
                </div>
                
                <button className="rounded-lg w-full bg-pink-600 p-4 text-xl text-white" onClick={reserveListing}>Reserve</button>
            </div>
        )
    }

    const [excludedDays, setExcludedDays] = useState<Date[]>([]);
    const [minDate, setMinDate] = useState(new Date());
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [price, setPrice] = useState<{
        amount: number,
        fees: number,
        total: number,
        unitPrice: number,
        unitQuantity: number
    } | null>(null);

    const [isCalOpen, setIsCalOpen ] = useState(false);

    /**
     * Triggered when ever there is a change in the dates.
     * @param dates new dates
     */
    const onChange = async (dates:[Date, Date]) => {
        setPrice(null)
        console.log(dates)
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        // Second date has been selected
        if (end) {
            setIsCalOpen(false)
        }

        if (start && end) {

            console.log("BOTH selected")
            // Make a quick backend call to see how much it will cost.
            let quote = (await graphqlSDK().getBookingQuote({
                listingId: listing.id,
                startDate: format(start, 'MM-dd-yyyy'),
                endDate: format(end, 'MM-dd-yyyy'),
                type: availabilityStringToType(listing.availability.type)
            })).getBookingQuote

            console.log(quote)
            setPrice({
                amount: quote.calculatedAmount,
                fees: quote.buyerAppFee,
                total: quote.calculatedAmount + quote.buyerAppFee,
                unitPrice: quote.unitPrice,
                unitQuantity: quote.unitQuantity
            })
        }

        
    };

    /**
     * Filter the days which can be chosen.
     * This will only be applied for the weekly and monthly calendars.
     */
    const filterDays = (date: Date) => {

        // Daily availability all days are open
        if (listing.availability.type === AvailabilityType.Daily) {
            return true
        } 
        // Weekly, we let them select the monday and then they can select the sunday after.
        else if (listing.availability.type === AvailabilityType.Weekly) {
            if (startDate && endDate) {
                return isMonday(date)
            }
            
            if (startDate) {
                // Don't allow them to choose previous the sundays before this chosen monday
                if (date < startDate) {
                    return false
                }
                return isSunday(date)
            }

            return isMonday(date)

        } else if (listing.availability.type === AvailabilityType.Monthly) {
            // return month days
            if (startDate && endDate) {
                return isFirstDayOfMonth(date)
            }
            if (startDate) {
                if (date < startDate) {
                    return false
                }
                return isLastDayOfMonth(date)
            }

            return isFirstDayOfMonth(date)
        }

        return true
    };

    useEffect(()=> {
        console.log('LISTING', listing)

        // Setup excluded days.
        if (listing.bookings) {

            let excludedInterval:Date[] = []
            listing.bookings.forEach(booking => {
                // Grab each interval and find days between them
                let interval = eachDayOfInterval({
                    start: parseISO(booking.startDate),
                    end: parseISO(booking.endDate)
                })
                
                // Add them to the excluded array.
                excludedInterval = excludedInterval.concat(interval)

            })

            setExcludedDays(excludedInterval)
        }

        // Set up the minimum date they can book.
        // Compare to the time right now.
        let now = new Date()

        let minDate = compareAsc(now, parseISO(listing.availability.startDate))  === -1 ? parseISO(listing.availability.startDate) : now
        setMinDate(minDate)
        }, [])

    return (
        <div >
            <div className="max-w-full md:max-w-xs" >
                <p className="text-xl py-3">Add dates for prices</p>
                <div className="flex flex-row">

                    <div className="border border-gray-400 rounded-l-md p-3 cursor-pointer select-none flex-1" onClick={() => setIsCalOpen(!isCalOpen)}>
                        <p className="uppercase text-xs">Check-in</p>
                        {}
                        <p className={`${startDate ? 'text-black' : 'text-gray-500'}`}>{startDate ? format(startDate, 'MM-dd-yyyy') : 'Add Date'}</p>
                    </div>

                    <div className="border border-gray-400 rounded-r-md p-3 cursor-pointer select-none flex-1" onClick={() => setIsCalOpen(!isCalOpen)}>
                        <p className="uppercase text-xs">Check-out</p>
                        <p className={`${endDate ? 'text-black' : 'text-gray-500'}`}>{endDate ? format(endDate, 'MM-dd-yyyy') : 'Add Date'}</p>
                    </div>
                </div>
            </div>

            <div className={`${isCalOpen ? 'block':'hidden'} max-w-full`}>
                <DatePicker
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    minDate={minDate}
                    maxDate={addMonths(parseISO(listing.availability.endDate), 1)}
                    excludeDates={excludedDays}
                    inline
                    filterDate={filterDays}
                    monthsShown={2}
                    // @ts-ignore when new version for type checks is released fix this.
                    calendarStartDay={1}
                    disabledKeyboardNavigation={true}
                />
            </div>

            <div className={`${price ? 'block' : 'hidden' } max-w-full md:max-w-xs`}>
                <PriceSummary/>
                <Warning text={"Please make sure you book early enough so that Alberta Health can easily inspect the kitchen and issue you the required permits. For more info, please check out our help section."} ></Warning>
            </div>
        </div>
    )
}


export default Calendar
