// Construct a schema, using GraphQL schema language
import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Query {
        getUser(id: Int!): User
    }
    type Mutation {
        addUser(id: String!, email: String!, signup: String!, active: Boolean!): Boolean!
    }
    type User {
        id: String!
        email: String!
        signup: String!
        active: Boolean!
        first_name: String
        last_name: String
        city: String
        province: String
        country: String
        stripe_customer: String
        stripe_account: String
    }
`;