import { User } from "../../entities/User/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation } from "type-graphql"

@InputType()
class UpdateUserInput implements Partial<User> {

    @Field()
    first_name?: string;

    @Field()
    last_name?: string;

    @Field()
    date_of_birth?: Date;
}

export class UpdateResolver {
    @Mutation(()=> User, {nullable: false})
    async updateUser(
        @Arg("user", {nullable: false}) {date_of_birth, first_name, last_name}: UpdateUserInput,
        @Ctx() {em, user}: MyContext
    ) {
        const me = await em.findOne(User, {id: user?.sub})

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
        await em.persistAndFlush(me);

        return me
    }
}