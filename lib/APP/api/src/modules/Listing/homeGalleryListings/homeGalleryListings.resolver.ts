
/**
 * This is where the home gallery listings will be fetched from.
 * Max show 20 listings at a time.
 * In the future, we can ask people to pay to get their listings be pushed to the home gallery.
 */

import { MyContext } from "../../../types";
import { Ctx, Query } from "type-graphql";
import { Listing } from "../../../entities/Listing/Listing";
// import { Booking } from "../../../entities/Booking/Booking";


export class HomeGalleryListingsResolver {

    @Query(()=>[Listing])
    async homeGalleryListings(
        @Ctx() {em}: MyContext
    ) {

        // For now, returning all listings for the home gallery.
        // Bug that caused issues with loading bookings, had to 
        // initialize it (https://mikro-orm.io/docs/collections/)
        let listings = await em.find(Listing, {})
        // This filter makes sure we only return confirmed bookings.
        for (const l of listings){
            l.bookings.init({where: {confirmed: true}})
        }

        // let bookings = await em.find(Booking, {confirmed: true})

        // console.log("Bookings", bookings)
        
        return listings
    }
}