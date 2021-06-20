import Image from 'next/image'
import { Booking } from 'src/graphql/generated/graphql';
import { availabilityTypeToString, toDecimalCurrency } from 'src/utils/helpers';


/**
 * I made this for the booking payments page, but then deicded
 * to use stripe session checkout instead.
 * 
 * This component can still be used for showing a confirmed booking 
 * elsewhere on the app.
 * @param booking booking to showcase
 * @returns A component with limited informatin about a listing.
 */

export const ListingBox = (booking: Booking) => {
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