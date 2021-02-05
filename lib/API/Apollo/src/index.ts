import "reflect-metadata";


import * as express from 'express';
import {ApolloServer} from 'apollo-server-express';


import { typeDefs } from "./typeDefs";
import { createTypeormConn } from "./utils/createTypeormConn";

import {resolvers} from './resolvers';

const startServer = async () => {
    
    await createTypeormConn();

    const server = new ApolloServer({ typeDefs, resolvers });

    const app = express();

    server.applyMiddleware({app})

    app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer();