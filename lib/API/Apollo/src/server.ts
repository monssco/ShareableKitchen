import "reflect-metadata";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';


import { ormClient } from "./utils/createDatabaseConn";
import { buildSchema } from "type-graphql";
import { MeResolver } from "./modules/User/me.resolver";

const startServer = async () => {

    // Connect to database using the ORM.

    await ormClient();


    /* There is a way to include resolvers using glob paths
        https://github.com/MichalLytek/type-graphql/issues/41
        But when I follow this example, it gives me an error,
        so for now, I will just include resolvers in here manually.
    */
    const schema = await buildSchema({
                        resolvers: [
                            MeResolver
                        ]
                    })


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