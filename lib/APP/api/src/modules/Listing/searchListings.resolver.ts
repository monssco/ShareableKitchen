
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
import {ListingLocation} from '../../entities/Listing/ListingLocation';
import { Country } from "../../entities/Geo/Country";
import { State } from "../../entities/Geo/State";
import { City } from "../../entities/Geo/City";

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

        const country = await em.findOne(Country, {id: input.countryId})
        const state = await em.findOne(State, {id: input.stateId})
        const city = await em.findOne(City, {id: input.cityId})
        // Find all listing in a given location.
        const location = await em.find(ListingLocation, {country, state, city})

        console.log(country);
        console.log(state);
        console.log(city);

        console.log(location);
        

        // Find all listings in that location that match the more granular filters.
        return await em.find(Listing, {location})
    }
}