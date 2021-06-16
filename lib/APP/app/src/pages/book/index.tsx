import React from 'react';
import {useRouter} from 'next/router';
import { GetServerSideProps, NextPage } from "next";
import { graphqlSDK } from '../../graphql/client';
import { AvailabilityType, CreateBookingReturn } from 'src/graphql/generated/graphql';
import ErrorPage from 'next/error';
import Image from 'next/image'
import { availabilityTypeToString, fromBackendMoney } from 'src/utils/helpers';

const Book: NextPage<{booking: CreateBookingReturn}> = (props) => {
    const router = useRouter()

    if (!props.booking) {
        return <ErrorPage statusCode={404} title={"We can't process your request, please try again"}/>;
    }

    let listing = props.booking.booking.listing
    let booking = props.booking.booking
    let piSecret = props.booking.paymentIntentSecret

    console.log("Router query", router.query)
    console.log("Payment intent secret", piSecret)
    console.log(booking)
    return (
        <div className="container mx-auto">
            <p>Request to book</p>
            <div>
                <Image
                    alt="Kitchen"
                    src="/kitchen.jpeg"
                    width={150}
                    height={150}
                />
                <p>{listing.title}</p>
                <div>{listing.features?.map(i => <p key={i}>{i}</p>)}</div>
            </div>
            <div>
                <p className="text-3xl">Price Details</p>
                <p>${fromBackendMoney(listing.unitPrice)} x {booking.unitQuantity} {availabilityTypeToString(booking.type)}</p>
            </div>
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