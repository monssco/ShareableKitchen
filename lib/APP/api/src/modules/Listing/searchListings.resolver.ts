
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

    @Field({nullable: true})
    startDate: Date

    @Field({nullable: true})
    endDate: Date
}

export class SearchListingsResolver {

    @Query(()=>[Listing])
    async searchListings(
        @Arg("input") input: SearchListingsInput,
        @Ctx() {em}: MyContext
    ) {

        let city = await em.findOneOrFail(City, {id: input.cityId})
        const listing = await em.find(Listing, {city})
        return listing
    }
}