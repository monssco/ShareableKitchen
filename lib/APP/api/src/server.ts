import "reflect-metadata";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import * as path from 'path';


import { ormClient } from "./utils/createDatabaseConn";
import { buildSchema } from "type-graphql";
import { MyContext } from "./types";

const startServer = async () => {

    // Connect to database using the ORM.

    


    /**
     * Including resolvers using glob patterns.
     * https://typegraphql.com/docs/bootstrap.html#create-typedefs-and-resolvers-map
     */
    const client = await ormClient();
    const schema = await buildSchema({
                        resolvers: [
                            path.resolve(__dirname, "modules/**/*.resolver.ts")
                        ],
                        emitSchemaFile: {
                            path: path.resolve(__dirname + '/../schema.graphql'),
                            commentDescriptions: true,
                            sortedSchema: false
                        },
                        nullableByDefault: true
                    })
    /* You can also pass in the redis cache in context here too.
    https://github.com/benawad/lireddit/blob/18_change-password/server/src/index.ts
    */
    const server = new ApolloServer({
        playground: true,
        introspection: true,
        schema,
        context: ({req, res}) : MyContext => ({
            em: client.em,
            req,
            res
        })
    })

    const app = express();

    /**
     * This health check for target group when uploading to ecs (aws)
     */
    app.get('/health-check', (_, res) => {
        res.sendStatus(200)
    })

    server.applyMiddleware({app, path: '/graphql'})

    let port = 80

    app.listen({ port: port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    );
};

startServer();