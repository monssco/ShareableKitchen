// import {Client} from 'pg'

import { MikroORM } from "@mikro-orm/core";
// import { User } from "../graphql/entity/User";

// // const environment = process.env.ENVIRONMENT || 'development'

// function connectToDB() {
//     const client = new Client({
//         user: process.env.DATABASE_USER || 'test',
//         host: process.env.DATABASE_HOST_URL || 'localhost',
//         database: process.env.DATABASE_NAME || 'postgres',
//         password: process.env.DATABASE_PASSWORD || 'test',
//         port: 5432,
//     })

//     try {
//         console.info("Connected to DB")
//         client.connect()
//         client.query('SELECT NOW()')
        
//         return client
//     } catch(e) {
//         console.info("Connection failed")
//         console.error(e)
//         process.exit(1)
//     }
// }

// const dbClient = connectToDB()

// export default dbClient;

import microConfig from '../../mikro-orm.config';

async function connectToDB() {
    // const orm = await MikroORM.init({
    //     entities: [User, Listing],
    //     dbName: 'postgres',
    //     type: 'postgresql',
    //     clientUrl: 'http://127.0.0.1',
    //     port: 5432,
    //     user: 'test',
    //     password: 'test',
    //     migrations: {
    //         tableName: 'mikro_orm_migrations',
    //         path: './migrations'
    //     }
    // })

    const orm = await MikroORM.init(microConfig);
    console.log("ORM EM", orm.em);

    await orm.getMigrator().up();

    // const user = new User('51ed421b-5a65-4195-944a-32e316e1f2f1', 'munibrhmn@gmail.com')
    

    // await orm.em.persistAndFlush(user);

    return orm
}

export const ormClient = () => connectToDB();