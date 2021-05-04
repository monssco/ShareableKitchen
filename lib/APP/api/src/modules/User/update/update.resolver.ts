import { User } from "../../../entities/User/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation } from "type-graphql"
import { City } from "../../../entities/Geo/City";

@InputType()
class UpdateUserLocationInput {

    @Field({nullable: true})
    address?: string

    @Field({nullable: true})
    cityId?: number

    @Field({nullable: true})
    postal?: string
}

@InputType()
export class UpdateUserInput implements Partial<User> {

    @Field({nullable: true})
    first_name?: string;

    @Field({nullable: true})
    last_name?: string;

    @Field({nullable: true})
    date_of_birth?: Date;

    @Field({nullable: true})
    location: UpdateUserLocationInput

}

export class UpdateResolver {
    @Mutation(()=> User, {nullable: false})
    async updateUser(
        @Arg("user", {nullable: false}) {date_of_birth, first_name, last_name, location}: UpdateUserInput,
        @Ctx() {em, user}: MyContext
    ) {
        const me = user

        if (!me) {
            throw Error("User not found")
        }

        if (first_name) {
            me.first_name = first_name
        }

        if (last_name) {
            me.last_name = last_name
        }

        if (date_of_birth) {
            me.date_of_birth = date_of_birth
        }

        if (location.address){
            me.address = location.address
        }

        if (location.postal) {
            me.postal = location.postal
        }

        if (location.cityId) {
            const city = await em.findOneOrFail(City, {id: location.cityId})
            me.city = city
        }

        await em.persistAndFlush(me);

        return me
    }
}