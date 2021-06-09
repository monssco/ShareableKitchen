import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';
import { parseISO, eachDayOfInterval, format, differenceInCalendarDays } from 'date-fns';
import React from 'react';
import { Listing } from 'src/graphql/generated/graphql';
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
        graphqlSDK()
    }

    const PriceSummary = () => {
        return (
            <div>
                <p className="py-2">Reservation: ${price?.reservation}</p>
                <p>Service Fee ${price?.fees}</p>
                <p className="py-2 font-medium">Total ${price?.total}</p>
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
    } | null>(null)

    const onChange = (dates:[Date, Date]) => {
        setPrice(null)
        console.log(dates)
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        if (end) {
            setIsCalOpen(false)
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

    useEffect(()=> {
        console.log('LISTING', listing)

        if (listing.bookings) {
            let excludedInterval:Date[] = []
            listing.bookings.forEach(booking => {
                let interval = eachDayOfInterval({
                start: parseISO(booking.startDate),
                end: parseISO(booking.endDate)
                })
                excludedInterval.concat(interval)
            })

            setExcludedDays(excludedInterval)
            }
        }, [])

    const showCalendar = () => {
        console.log("Start date clicked")
        console.log("End date clicked")
        setIsCalOpen(!isCalOpen)
    }
    const [isCalOpen, setIsCalOpen ] = useState(false)


    return (
        <div className="">
            <p className="text-xl py-3">Add dates for prices</p>
            <div className="flex flex-row">

                <div className="border border-gray-400 rounded-l-md p-3 w-40 cursor-pointer select-none" onClick={showCalendar}>
                    <p className="uppercase text-xs">Check-in</p>
                    {}
                    <p className={`${startDate ? 'text-black' : 'text-gray-500'}`}>{startDate ? format(startDate, 'MM-dd-yyyy') : 'Add Date'}</p>
                </div>

                <div className="border border-gray-400 rounded-r-md p-3 w-40 cursor-pointer select-none" onClick={showCalendar}>
                    <p className="uppercase text-xs">Check-out</p>
                    <p className={`${endDate ? 'text-black' : 'text-gray-500'}`}>{endDate ? format(endDate, 'MM-dd-yyyy') : 'Add Date'}</p>
                </div>
            </div>

            <div className={`${isCalOpen ? 'block':'hidden'}`}>
                <DatePicker
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    minDate={new Date()}
                    maxDate={parseISO(listing.availability.endDate)}
                    excludeDates={excludedDays}
                    inline
                />
            </div>

            <div className={`${price ? 'block' : 'hidden' }`}>
                <PriceSummary/>
            </div>
        </div>
    )
}

export default Calendar
