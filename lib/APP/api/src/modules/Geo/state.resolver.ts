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
        const cities = await em.find(City, {state})
        return cities
    }
}