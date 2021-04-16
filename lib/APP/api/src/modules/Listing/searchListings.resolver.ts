
/**
 * How I think search will work.
 * There are levels to the search. Starting from the very top.
 * 
 * Location
 * Date (Start OR (Start to END))
 * Features (Filtering)
 */

import { MyContext } from "../../types";
import { Arg, Ctx, Field, InputType, Query } from "type-graphql";
import { Listing } from "../../entities/Listing/Listing";

@InputType()
class SearchListingsInput {

    @Field()
    countryId: number

    @Field({nullable: true})
    stateId?: number

    @Field({nullable: true})
    cityId?: number
}

export class SearchListingsResolver {

    @Query(()=>[Listing])
    async searchListings(
        @Arg("input") input: SearchListingsInput,
        @Ctx() {em}: MyContext
    ) {


        // Find all listing in a given location.
        // await em.find(ListingLocation, {city: {state : {country: {id: input.countryId}, id: input.stateId}, id: input.cityId}}) 
        const listing = await em.find(Listing, {city: {id: input.cityId}}) 
        

        console.log(listing);
        

        // Find all listings in that location that match the more granular filters.
        return listing
    }
}