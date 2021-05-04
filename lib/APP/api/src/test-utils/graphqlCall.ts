import { graphql, GraphQLSchema } from "graphql";
import { User } from "../entities/User/User";
import Stripe from "stripe";

import { Maybe } from "type-graphql";

import { createSchema } from "../utils/createSchema";
import { testConn } from "./testConn";

const stripe = new Stripe('sk_test_51IhXgtGZgehPj4cv80xEq7vmSZm6r3fXZs6yxY9Syb22IALSmftnkxFNyRnWkClLgijH1D50hE8QKhSS95hJQaj100AQh0EX6v', {
    apiVersion: '2020-08-27',
});

interface Options {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
    user?: User;
}

let schema: GraphQLSchema;
/**
 * Helps creating calls to the graphql resolvers
 * @param param0 options
 * @returns graphql
 */
export const graphqlCall = async ({ source, variableValues, user }: Options) => {
    if (!schema) {
        schema = await createSchema();
    }

    return graphql({
        schema,
        source,
        variableValues,
        contextValue: {
            res: {
                clearCookie: jest.fn()
            },
            stripe,
            em: (await testConn()).em,
            user
        }
    });
};