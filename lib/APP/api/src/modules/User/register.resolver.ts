import { User } from "../../entities/User/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, ID, InputType, Mutation, Resolver } from "type-graphql";
import { City } from "../../entities/Geo/City";

@InputType()
class RegisterUserInput implements Partial<User> {
    @Field(()=> ID, {nullable: false})
    id: string;

    @Field({nullable: false})
    email: string;

    @Field()
    first_name: string;

    @Field()
    last_name: string;

    @Field()
    date_of_birth: Date;
}

@Resolver()
export class RegisterResolver {
    @Mutation(()=> User, {nullable: false})
    async registerUser(
        @Arg("user", {nullable: false}) user: RegisterUserInput,
        @Ctx() {em}: MyContext) {
        const newUser = new User(user.id, user.email)
        newUser.first_name = user.first_name
        newUser.last_name = user.last_name
        newUser.date_of_birth = user.date_of_birth

        const city = await em.findOneOrFail(City, {id: 16152})
        newUser.city = city
        await em.persistAndFlush(newUser);
        return newUser
    }
}