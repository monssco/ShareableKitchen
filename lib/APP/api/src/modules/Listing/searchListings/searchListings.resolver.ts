
/**
 * How I think search will work.
 * There are levels to the search. Starting from the very top.
 * 
 * Location
 * Date (Start OR (Start to END))
 * Features (Filtering)
 */

import { MyContext } from "../../../types";
import { Arg, Ctx, Field, InputType, Query } from "type-graphql";
import { Listing } from "../../../entities/Listing/Listing";
import { City } from "../../../entities/Geo/City";
import { PaginationInput } from "../../Base/pagination.resolver";
import { FindOptions } from "@mikro-orm/core";

@InputType()
class SearchListingsInput extends PaginationInput {

    @Field()
    cityId: number

    @Field({nullable: true})
    startDate?: Date

    @Field({nullable: true})
    endDate?: Date

}

export class SearchListingsResolver {

    @Query(()=>[Listing])
    async searchListings(
        @Arg("input") input: SearchListingsInput,
        @Ctx() {em}: MyContext
    ) {

        var listing: Listing[] = []
        var options: FindOptions<Listing> = {
            limit: input.limit,
            offset: input.offset,
            orderBy: {
                published: 'asc'
            }
        }


        let city = await em.findOneOrFail(City, {id: input.cityId})
        if (input.startDate && input.endDate) {
            listing = await em.find(Listing, {city, availability: {
                startDate: {
                    $gte: input.startDate
                },
                endDate: {
                    $lte: input.endDate
                }
            }}, options)
        } else if (input.startDate) {
            listing = await em.find(Listing, {city, availability: {
                startDate: {
                    $gte: input.startDate
                }
            }}, options)
        } else if (input.endDate) {
            listing = await em.find(Listing, {city, availability: {
                startDate: {
                    $gte: input.startDate
                },
                endDate: {
                    $lte: input.endDate
                }
            }}, options)
        } else {
            listing = await em.find(Listing, {city},  options)
        }
        
        return listing
    }
}