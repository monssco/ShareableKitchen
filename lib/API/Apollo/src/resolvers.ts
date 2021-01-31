import { User } from "./entity/User";

// Provide resolver functions for your schema fields
export const resolvers = {
    Query: {
        getUser: async (_: any, args: any) => {
            const { id } = args;
            

            return await User.findOne(id);;
        }
    },
    Mutation: {
        addUser: async (_: any, args: any) => {
            const { firstName, lastName, age } = args;

            // return true;
            try {
                const user = 

                User.create({age, firstName, lastName})

                await User.save(user);

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
};