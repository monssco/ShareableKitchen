import "reflect-metadata";
import * as express from 'express';
import {ApolloServer } from 'apollo-server-express';


import { createSchema } from "./utils/createSchema";
import { ormClient } from "./utils/createDatabaseConn";

const startServer = async () => {

    // Connect to database using the ORM.

    await ormClient();


    const schema = await createSchema();
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