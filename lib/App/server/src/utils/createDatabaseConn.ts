
// const dbClient = connectToDB()

// export default dbClient;

import { MikroORM } from '@mikro-orm/core';
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