import React from 'react';
import {useRouter} from 'next/router';
import { GetServerSideProps, NextPage } from "next";
import { graphqlSDK } from '../../graphql/client';
import { AvailabilityType, CreateBookingReturn } from 'src/graphql/generated/graphql';
import ErrorPage from 'next/error';

const Book: NextPage<{booking: CreateBookingReturn}> = ({booking}) => {
    const router = useRouter()

    if (!booking) {
        return <ErrorPage statusCode={404} title={"We can't process your request, please try again"}/>;
    }

    console.log("Router query", router.query)
    console.log("Payment intent secret", booking.paymentIntentSecret)
    console.log(booking)
    return (
        <div>
            Hello, this is the booking page tagalog
            {JSON.stringify(router.query)}
        </div>
    )
}

export default Book

export const getServerSideProps: GetServerSideProps = async ({res, query}) =>
{
    const {listingId, startDate, endDate, type} = query
    let id = listingId as string
    let start = startDate as string
    let end = endDate  as string
    let _type = type as AvailabilityType
    try {
        
        let booking =  await graphqlSDK().createBooking({
            listingId: id,
            startDate: start,
            endDate: end,
            type: _type
        })
        return {
            props: 
                {
                    booking: booking.createBooking
                }
            }
        } catch (error) {
            console.log("ERROR", error)
            res.statusCode = 404;
            return {
                props: {}
            }
    }
}