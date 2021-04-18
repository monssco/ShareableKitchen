
import { State } from "../../entities/Geo/State"
import { City } from "../../entities/Geo/City"
import { MyContext } from "src/types"
import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql"
import { Country } from "../../entities/Geo/Country"

/**
 * Resolver for fetching countries, states and so on.
 */
@Resolver(() => Country)
export class GetCountriesResolver {

    @Query(() => [Country])
    async getCountries(
        @Ctx() {em}: MyContext
    ): Promise<Country[]> {
        const countries = await em.find(Country, {})
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

@Resolver(() => State)
export class StateResolver {
    @FieldResolver()
    async cities(
        @Root() state: State,
        @Ctx() {em}: MyContext
    ): Promise<City[]> {
        const cities = await em.find(City, {state})
        return cities
    }
}