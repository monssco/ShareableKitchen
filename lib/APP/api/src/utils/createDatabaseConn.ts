import { MikroORM } from '@mikro-orm/core';
import microConfig from '../../mikro-orm.config';
// import { seedDatabase } from './helpers';

async function connectToDB() {

    /*
    Initialize orm using the config file.
    */
    const orm = await MikroORM.init(microConfig);

    /*
    Run Migrations on the database.
    */
    await orm.getMigrator().up();


    /**
     * Seed the database with info that is required.
     */
    // await seedDatabase(orm.em);

    return orm
}

export const ormClient = () => connectToDB();