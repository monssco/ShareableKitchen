import {User} from './src/entities/User';
import * as path from 'path';
import { MikroORM } from '@mikro-orm/core';
import { Listing } from './src/entities/Listing';

export default {
    migrations: {
        path: path.join(__dirname, "./src/migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    entities: [User, Listing],
    type: 'postgresql',
    dbName: process.env.DATABASE_NAME || 'postgres',
    clientUrl: process.env.DATABASE_URL ||  'http://127.0.0.1',
    port: 5432,
    user: process.env.DATABASE_USER || 'test',
    password: process.env.DATABASE_PASSWORD || 'test',

} as Parameters<typeof MikroORM.init>[0];