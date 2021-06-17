import React from 'react';
import {useRouter} from 'next/router';
import { GetServerSideProps, NextPage } from "next";
import { graphqlSDK } from '../../graphql/client';
import { AvailabilityType, Booking, CreateBookingReturn } from 'src/graphql/generated/graphql';
import ErrorPage from 'next/error';
import Image from 'next/image'
import { availabilityTypeToString, toDecimalCurrency } from 'src/utils/helpers';

const ListingBox = (booking: Booking) => {
    let listing = booking.listing
    return(
        <div className="max-w-sm border-gray-300 border p-5 rounded-xl">
                <div>
                    <Image
                        alt="Kitchen"
                        src="/kitchen.jpeg"
                        width={150}
                        height={150}
                    />
                    <p className="text-2xl">{listing.title}</p>
                    <div>{listing.features?.map(i => <p key={i}>{i}</p>)}</div>
                </div>
                <div className="py-2">
                    <p className="text-3xl">Price Details</p>
                </div>
                <div className="py-2">
                    <div className="flex justify-between">
                        <p>${toDecimalCurrency(listing.unitPrice)} x {booking.unitQuantity} {availabilityTypeToString(booking.type)}{booking.unitQuantity > 1 ? 's': ''}</p>
                        <p>${toDecimalCurrency(booking.calculatedAmount)}</p>
                    </div>
                </div>
                <div className="py-2">
                    <div className="flex justify-between">
                        <p>Service Fees</p>
                        <p>${toDecimalCurrency(booking.buyerAppFee)}</p>
                    </div>
                </div>
                <div className="font-semibold py-2">
                    <div className="flex justify-between">
                        <p>Total</p>
                        <p>${toDecimalCurrency(booking.calculatedAmount + booking.buyerAppFee)}</p>
                    </div>
                </div>
            </div>
    )
}

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
            <p className="text-4xl font-semibold py-6">Request to book</p>
            <ListingBox {...booking} />
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