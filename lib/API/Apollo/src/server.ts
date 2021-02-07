import "reflect-metadata";
import * as express from 'express';
import {ApolloServer} from 'apollo-server-express';

import { typeDefs } from "./graphql/entity/typeDefs";
import { resolvers } from "./graphql/entity/resolvers";


const startServer = async () => {

    const server = new ApolloServer({ typeDefs, resolvers });

    const app = express();

    server.applyMiddleware({app})

    app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer();