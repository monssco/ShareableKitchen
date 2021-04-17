
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
import { City } from "../../entities/Geo/City";

@InputType()
class SearchListingsInput {

    @Field()
    cityId: number
}

export class SearchListingsResolver {

    @Query(()=>[Listing])
    async searchListings(
        @Arg("input") input: SearchListingsInput,
        @Ctx() {em}: MyContext
    ) {

        let city = await em.findOneOrFail(City, {id: input.cityId})

        console.log('CITY', city)

        try {
            const listing = await em.find(Listing, {city}) 
            return listing
        } catch (error) {
            console.log(error)
            const listing = await em.find(Listing, {city}) 
            return listing
        }
        

        // console.log(listing);
        

        // // Find all listings in that location that match the more granular filters.
        // return listing
    }
}