
import { State } from "../../entities/Geo/State"
import { MyContext } from "src/types"
import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql"
import { Country } from "../../entities/Geo/Country"

@Resolver(() => Country)
export class GetCountriesResolver {

    @Query(() => [Country])
    async getCountries(
        @Ctx() {em}: MyContext
    ): Promise<Country[]> {

        const countries = await em.find(Country, {})
        console.log(countries)
        return countries
    }

    @FieldResolver()
    async states(
        @Root() country: Country,
        @Ctx() {em}: MyContext
    ): Promise<State[]> {
        const states = await em.find(State, {country})
        return states
    }
}