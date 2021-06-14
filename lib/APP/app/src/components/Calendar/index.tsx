import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';
import { parseISO, eachDayOfInterval, format, differenceInCalendarDays, getDay, isMonday, isFriday, isSunday, isFirstDayOfMonth, isLastDayOfMonth } from 'date-fns';
import React from 'react';
import { AvailabilityType, Listing } from 'src/graphql/generated/graphql';
import { graphqlSDK } from 'src/graphql/client';

// API and examples
// https://reactdatepicker.com/
/**
 * Big screen, shows a date picker for start date and a date picker for end date
 * Smaller screens, shows 
 * @param listing 
 * @returns 
 */
const Calendar: React.FC<Listing> = (listing: Listing) => {

    const reserveListing = () => {
        console.log("reserve that shit")
        // Should take you to booking page with this info.
    }

        const PriceSummary = () => {
        return (
            <div>
                <div className="flex flex-row py-2 justify-between">
                    <p>Reservation </p>
                    <p>${price?.reservation}</p>
                </div>
                <div className="flex flex-row py-2 justify-between">
                    <p>Service Fee</p>
                    <p>${price?.fees}</p>
                </div>
                <div className="flex flex-row py-2 justify-between font-medium">
                    <p>Total</p>
                    <p>${price?.total}</p>
                </div>
                
                <button className="rounded-lg w-full bg-pink-600 p-4 text-xl text-white" onClick={reserveListing}>Reserve</button>
            </div>
        )
    }

    const [excludedDays, setExcludedDays] = useState<Date[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [price, setPrice] = useState<{
        reservation: number,
        fees: number,
        total: number
    } | null>(null);

    const [isCalOpen, setIsCalOpen ] = useState(false);

    /**
     * Triggered when ever there is a change in the dates.
     * @param dates new dates
     */
    const onChange = (dates:[Date, Date]) => {
        setPrice(null)
        console.log(dates)
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        // Second date has been selected
        if (end) {
            setIsCalOpen(false)
        }

        // Dates exist on the start and end date
        if (startDate && endDate) {
            
        }

        if (start && end) {
            console.log("BOTH selected")
            let numDays = differenceInCalendarDays(end, start) + 1
            console.log(numDays)
            let price = numDays * listing.unitPrice
            let buyerFees = price * 0.03
            setPrice({
                reservation: price,
                fees: buyerFees,
                total: price + buyerFees
            })
            console.log(price)
        }

        
    };

    /**
     * Filter the days which can be chosen.
     * This will only be applied for the weekly and monthly calendars.
     */
    const filterDays = (date: Date) => {

        if (listing.availability.type === AvailabilityType.Daily) {
            return true
        } else if (listing.availability.type === AvailabilityType.Weekly) {
            if (startDate && endDate) {
                return isMonday(date)
            }
            
            if (startDate) {
                return isSunday(date)
            }

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
        // if (listing.bookings) {
        //     let excludedInterval:Date[] = []
        //     listing.bookings.forEach(booking => {
        //         let interval = eachDayOfInterval({
        //         start: parseISO(booking.startDate),
        //         end: parseISO(booking.endDate)
        //         })
        //         excludedInterval.concat(interval)
        //     })

        //     setExcludedDays(excludedInterval)
        // }
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
                    minDate={new Date()}
                    maxDate={parseISO(listing.availability.endDate)}
                    excludeDates={excludedDays}
                    inline
                    filterDate={filterDays}
                    monthsShown={2}
                    // @ts-ignore when new version for type checks is released fix this.
                    calendarStartDay={1}
                />
            </div>

            <div className={`${price ? 'block' : 'hidden' } max-w-full md:max-w-xs`}>
                <PriceSummary/>
            </div>
        </div>
    )
}


export default Calendar
