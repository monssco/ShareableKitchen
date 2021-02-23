import "reflect-metadata";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';


import { ormClient } from "./utils/createDatabaseConn";
import { buildSchema } from "type-graphql";
import { MeResolver } from "./modules/User/me.resolver";
import { MyContext } from "./types";

const startServer = async () => {

    // Connect to database using the ORM.

    const client = await ormClient();


    /* There is a way to include resolvers using glob paths
        https://github.com/MichalLytek/type-graphql/issues/41
        But when I follow this example, it gives me an error,
        so for now, I will just include resolvers in here manually.
    */
    const schema = await buildSchema({
                        resolvers: [
                            MeResolver
                        ],
                        emitSchemaFile: {
                            path: __dirname + '/../schema.graphql',
                            commentDescriptions: true,
                            sortedSchema: false
                        }
                    })


    /* You can also pass in the redis cache in context here too.
        https://github.com/benawad/lireddit/blob/18_change-password/server/src/index.ts
    */
    const server = new ApolloServer({
        
        schema,
        context: ({req, res}) : MyContext => ({
            em: client.em,
            req,
            res
        })
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

    /**
     * This health check for target group when uploading to ecs (aws)
     */
    app.get('/health-check', (_, res) => {
        res.sendStatus(200)
    })

    server.applyMiddleware({app, path: '/'})

    app.listen({ port: 80 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer();