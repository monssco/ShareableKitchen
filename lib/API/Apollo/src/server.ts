import "reflect-metadata";
import * as express from 'express';
import {ApolloServer } from 'apollo-server-express';


import { createSchema } from "./graphql/utils";

const startServer = async () => {

     const schema = await createSchema();

    // Passing the database connection as a client to each resolver.
    // We could pass other stuff in here as well, such as the 

    const server = new ApolloServer({
        schema
    })

    // const server = new ApolloServer({ typeDefs, 
    //     resolvers, 
    //     context: ({ req }) => {
    //         console.log("Request:",req.headers)
    //         return {
    //             client: dbClient
    //         }
    // } });

    const app = express();

    server.applyMiddleware({app})

    app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer();