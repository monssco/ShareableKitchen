import React from 'react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import ErrorPage from 'next/error'
import { graphqlSDK } from 'src/graphql/client';

//TODO: Auth-wall this

export const getServerSideProps = async ({res, query}: GetServerSidePropsContext) =>
{
    const {bookingId} = query

    try {

        let id = bookingId! as string

        let booking = await graphqlSDK().retrieveBooking({id})

        return {
            props: {
                booking
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


const Success = ({booking}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    if (!booking) {
        return <ErrorPage statusCode={404} title={"We can't process your request, please try again"}/>;
    }

    console.log("Booking", booking)
    return (
        <div>
            <div>
                Congratulations! Your booking is now confirmed.
                You should receive an email shortly with the exact times and further instructions along with the location.

                If you have any questions please contact us via support@shareablekitchen.com


                Happy Cooking!
            </div>
        </div>
    )
}

export default Success