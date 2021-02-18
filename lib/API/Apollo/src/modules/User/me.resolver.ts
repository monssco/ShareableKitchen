import { User } from '../../entities/User';
import { MyContext } from 'src/types';
import {Arg, Ctx, Field, InputType, Mutation, Query, Resolver} from 'type-graphql';
import { ID } from 'type-graphql';

/*
Problem: So when you attach listings to a user, and that user's information is made public, how should it be handled? We can't return a user type, it will also expose the stripe ids and more stuff, need a way to only expose stuff that can be exposed, nothing sensitive.
*/

@InputType()
class RegisterUserInput implements Partial<User> {
    @Field(()=> ID)
    id: string;

    @Field()
    email: string;

    @Field({nullable: true})
    first_name: string;

    @Field({nullable: true})
    last_name: string;

    @Field({nullable: true})
    date_of_birth: Date;
}

@InputType()
class UpdateUserInput implements Partial<User> {
    @Field(()=> ID)
    id: string;

    @Field({nullable: true})
    first_name?: string;

    @Field({nullable: true})
    last_name?: string;

    @Field( {nullable: true})
    date_of_birth?: Date;
}

@Resolver()
export class MeResolver {

    @Query(() => User)
    async me(
        @Arg("id") id: string,
        @Ctx() {em}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id})
        return me;
    }

    @Mutation(()=> User)
    async registerUser(
        @Arg("user") user: RegisterUserInput,
        @Ctx() {em}: MyContext) {
        const newUser = new User(user.id, user.email)
        newUser.first_name = user.first_name
        newUser.last_name = user.last_name
        newUser.date_of_birth = user.date_of_birth
        await em.persistAndFlush(newUser);
        return newUser
    }

    @Mutation(()=> User)
    async updateUser(
        @Arg("user") {id, date_of_birth, first_name, last_name}: UpdateUserInput,
        @Ctx() {em}: MyContext
    ) {
        const me = await em.findOne(User, {id})

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

// export const resolver = {
//     Query: {
//         getUser: async (_: any, args: any, context: any): Promise<User> => {
//             const {client} = context
//             // console.info("Obj", obj);
//             // console.log("context", context)
//             // console.log("info", info)
//             const { id } = args;
            
//             console.log("arg", args)

//             const query = {
//                 // give the query a unique name
//                 name: 'fetch-user',
//                 text: 'SELECT * FROM public.user WHERE id = $1',
//                 values: [id],
//                 }

//             const user = await client.query(query)
//             console.log("Found user", user.rows[0]);
//             return user.rows[0];
//         }
//     },
//     Mutation: {
//         addUser: async (_: any, args: any, context: any) => {
//             const {client} = context;
//             const { id, email, signup, active } = args;

//             // return true;
//             // try {

//                 console.log(args)

//                 const text = 'INSERT INTO public.user(id, email, first_name, last_name, signup, city, province, country, active, stripe_customer, stripe_account) VALUES($1, $2, NULL, NULL, $3, NULL, NULL, NULL, $4, NULL, NULL) RETURNING *'
//                 const values = [id ,email, signup, active]

                
                
//                 const result = await client.query(text, values)

//                 console.log(result);

//                 return result.rows[0];
//             // } catch (error) {
//             //     console.log(error);
//             //     return false;
//             // }
//         }
//     }
// }