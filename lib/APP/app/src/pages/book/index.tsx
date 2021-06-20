import React, { useEffect } from 'react';
import { GetServerSideProps, NextPage } from "next";
import { graphqlSDK } from '../../graphql/client';
import { AvailabilityType, CreateBookingReturn } from 'src/graphql/generated/graphql';
import ErrorPage from 'next/error';


import config from '../../config'
import {loadStripe} from '@stripe/stripe-js'




/**
 * This page is responsible for requesting a booking from the backend
 * and then referring you to stripe's page.
 * It is also responsible for making sure that the user is logged in,
 * otherwise it will redirect the user to the login page.
 * @param props booking that will be send back from the backend
 * @returns refers you to stripe's booking page
 */

const Book: NextPage<{booking: CreateBookingReturn}> = (props) => {

    if (!props.booking) {
        return <ErrorPage statusCode={404} title={"We can't process your request, please try again"}/>;
    }

    useEffect(() => {
        const stripeRedirect = async ()=> {
            const stripePromise = await loadStripe(config.stripePublishableKey,
                {
                    stripeAccount: ''
                })
            stripePromise?.redirectToCheckout({sessionId:  props.booking.sessionId})
        } 
        stripeRedirect();
    }, [])

    return (
        <div className="container mx-auto">
            <p className="text-4xl font-semibold py-6">Request to book</p>
            {/* <ListingBox {...booking} /> */}
            <div className="max-w-sm">
            </div>
        </div>
    )
}

export default Book

export const getServerSideProps: GetServerSideProps = async ({req, res, query}) =>
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
            type: _type,
            cancelUrl: `${req.headers.referer}`,
            successUrl: `${req.headers.referer}/success`
        })

        console.log(booking)
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