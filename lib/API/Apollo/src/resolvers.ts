import { getConnection } from "typeorm";
import { User } from "./entity/User";


export const resolvers = {
    Query: {
        getUser: async (_: any, args: any) => {
            const { id } = args;
            
            console.log("arg", args)
            const user = await User.findOne(id);
            console.log("Found user", user);
            return user;
        },
        getAllUsers: async (_: any) => {
            const users = User.find();
            return users;
        }
    },
    Mutation: {
        addUser: async (_: any, args: any) => {
            const { firstName, lastName, age, street } = args;

            // return true;
            try {
                const user = 

                User.create({age, firstName, lastName, street})

                
            const result = await getConnection().getRepository(User).save
                (user)

                console.log(result);

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
};