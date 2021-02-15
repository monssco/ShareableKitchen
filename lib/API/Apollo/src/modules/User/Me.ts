// Kind of an ugly notation, but come back to this

import {Arg, Field, InputType, Mutation, Query, Resolver} from 'type-graphql';
import { User } from '../../entities/User';

import {ormClient} from '../../utils/createDatabaseConn'

// import {EntityManager} from '@mikro-orm/postgresql'

@InputType()
class UserInput implements Partial<User> {
    @Field()
    id: string;

    @Field()
    email: string;
}

@Resolver()
export class MeResolver {

    @Query(() => User)
    async me(): Promise<User> {
        return new User('udid', "munibrhmn@gmail.com")
    }

    @Mutation(()=> User, {nullable: true})
    async registerUser(@Arg("user") user: UserInput) {
        console.log(user)
        const orm = await ormClient();
        await orm.connect()
        const result = await orm.em.flush()
        console.log(result)
        
        return new User('udid', 'munibrhmn@gmail.com')

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