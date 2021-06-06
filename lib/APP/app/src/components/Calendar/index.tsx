import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';
import { parseISO, eachDayOfInterval } from 'date-fns';
import React from 'react';
import { Listing } from 'src/graphql/generated/graphql';

// API and examples
// https://reactdatepicker.com/
/**
 * Big screen, shows a date picker for start date and a date picker for end date
 * Smaller screens, shows 
 * @param listing 
 * @returns 
 */
const Calendar: React.FC<Listing> = (listing: Listing) => {


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const onChange = (dates:[Date, Date]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    // const [allowedDays, setAllowedDays] = useState<Date[]>([]);

    const [excludedDays, setExcludedDays] = useState<Date[]>([]);

    useEffect(()=> {
        console.log('LISTING', listing)
        // if (listing.availability) {
        //     setAllowedDays(
        //         eachDayOfInterval({
        //         start: parseISO(listing.availability.startDate),
        //         end: parseISO(listing.availability.endDate)
        //     })
        //     )
        // }

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
                    <p className="text-gray-500">Add Date</p>
                </div>

                <div className="border border-gray-400 rounded-r-md p-3 w-40 cursor-pointer select-none" onClick={showCalendar}>
                    <p className="uppercase text-xs">Check-out</p>
                    <p className="text-gray-500">Add Date</p>
                </div>
            </div>

            <div className={`${isCalOpen ? 'block':'hidden'}`}>
                <DatePicker
                    className="w-full"
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    minDate={new Date()}
                    // excludeDates={excludedDays}
                    inline
                />
            </div>
        </div>
    )
}

export default Calendar
