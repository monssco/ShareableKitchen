import React from 'react'
import Image from 'next/image'
import { Listing } from 'src/graphql/generated/graphql'

/**
 * Smaller icon for listing.
 * @returns JSX Element
 */
const SmallListing: React.FC<{listing: Listing}> = ({listing}) => {
  {console.log('SMALL OBJ', listing)}
    return (
        <div>
          
            <Image
                alt="Kitchen"
                src="/kitchen.jpeg"
                width={200}
                height={200}
            />
            <div>{listing.title}</div>
            <div>$ {listing.unitPrice/100} - {listing.availability.type}</div>
            <div>{listing.city?.name}</div>
        </div>
    )
}

export default SmallListing
