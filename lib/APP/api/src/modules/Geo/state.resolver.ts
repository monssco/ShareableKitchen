import { City } from "../../entities/Geo/City"
import { State } from "../../entities/Geo/State"
import { MyContext } from "src/types"
import { Ctx, FieldResolver, Root, Resolver } from "type-graphql"

@Resolver(() => State)
export class StateResolver {
    @FieldResolver()
    async cities(
        @Root() state: State,
        @Ctx() {em}: MyContext
    ): Promise<City[]> {
        console.log("STATE", state);
        const s = await em.getReference(State, [state.country.id, state.id])

        try {
            await em.find(City, {state: s})
        } catch (error) {
            console.log("Error, not foind", error)
        }
        const cities = await em.find(City, {state: s})
        // let c = new City(1, "poopville")
        console.log('cities', cities)
        return cities
    }
}