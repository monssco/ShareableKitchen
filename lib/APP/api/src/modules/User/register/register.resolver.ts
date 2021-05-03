import { User } from "../../../entities/User/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, ID, InputType, Mutation, Resolver } from "type-graphql";
import { City } from "../../../entities/Geo/City";

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
        @Ctx() {em, stripe}: MyContext) {
        const newUser = new User(user.id, user.email)
        newUser.first_name = user.first_name
        newUser.last_name = user.last_name
        newUser.date_of_birth = user.date_of_birth

        const customer = await stripe.customers.create({
            email: user.email,
            name: user.first_name,
            
        })

        /**
         * Create a user with this basic info only.
         * Later on they will onboard themselves.
         */
        const account = await stripe.accounts.create({
            email: user.email,
            type: "express",
            country: "CA",
            capabilities: {
                card_payments: {
                    requested: true
                },
                transfers: {
                    requested: true
                }
            }
        })

        newUser.stripe_customer_id = customer.id
        newUser.stripe_account_id = account.id

        const city = await em.findOneOrFail(City, {id: 16152})
        newUser.city = city
        await em.persistAndFlush(newUser);
        return newUser
    }
}