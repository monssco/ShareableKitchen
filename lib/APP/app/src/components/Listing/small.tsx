import React from 'react'
import Image from 'next/image'
import { Listing } from 'src/graphql/generated/graphql'

/**
 * Smaller icon for listing.
 * @returns JSX Element
 */
const SmallListing: React.FC<{listing: Listing}> = ({listing}) => {
    return (
        <div>
            <Image
                alt="Kitchen"
                src="/kitchen.jpeg"
                width={200}
                height={200}
            />
            <div className="text-xl">{listing.title}</div>
            <div>$ {listing.unitPrice/100} - {listing.availability.type}</div>
            <div>City - {listing.city?.id}</div>
        </div>
    )
}

export default SmallListing
