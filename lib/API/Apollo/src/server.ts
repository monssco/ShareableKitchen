import "reflect-metadata";

import * as Knex from 'knex';

import * as express from 'express';
import {ApolloServer} from 'apollo-server-express';


import { typeDefs } from "./typeDefs";


const startServer = async () => {
    
    // await createTypeormConn();

    const config: Knex.Config = require('knex')({
        client: 'pg',
        version: '7.2',
        connection: {
            host : '127.0.0.1',
            user : 'test',
            password : 'test',
            database : 'postgres'
        }
    });

    // const knexInstance = knex(config);


    const server = new ApolloServer({ typeDefs, resolvers });

    const app = express();

    server.applyMiddleware({app})

    app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer();