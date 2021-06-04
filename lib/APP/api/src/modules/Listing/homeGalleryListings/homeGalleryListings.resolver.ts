
/**
 * This is where the home gallery listings will be fetched from.
 * Max show 20 listings at a time.
 * In the future, we can ask people to pay to get their listings be pushed to the home gallery.
 */

import { MyContext } from "../../../types";
import { Ctx, Query } from "type-graphql";
import { Listing } from "../../../entities/Listing/Listing";


export class HomeGalleryListingsResolver {

    @Query(()=>[Listing])
    async homeGalleryListings(
        @Ctx() {em}: MyContext
    ) {

        // For now, returning all listings for the home gallery.
        let listings = await em.find(Listing, {})
        console.log("Homepage", listings)
        return listings
    }
}