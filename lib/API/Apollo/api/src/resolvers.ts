import { User } from "./entity/User";
import {getRepository} from 'typeorm';

// Provide resolver functions for your schema fields
export const resolvers = {
    Query: {
        getUser: async (_: any, args: any) => {
            const { id } = args;

            return await getRepository(User).findOne(id);
        }
    },
    Mutation: {
        addUser: async (_: any, args: any) => {
            const { firstName, lastName, age } = args;

            // return true;
            try {
                const user = getRepository(User).create({age, firstName, lastName});

                await getRepository(User).save(user);

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
};