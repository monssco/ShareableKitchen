import { MikroORM } from '@mikro-orm/core';
import microConfig from '../../mikro-orm.config';
// import { seedDatabase } from './helpers';

async function connectToDB() {

    /*
    Initialize orm using the config file.
    */
    const orm = await MikroORM.init(microConfig);

    /**
     * Create migrations, if they are required and then also go up on them.
     */
    if (process.env.NODE_ENV !== "production") {
        await orm.getMigrator().createMigration();
        await orm.getMigrator().up();
    }


    /**
     * Seed the database with info that is required.
     */
    // await seedDatabase(orm.em);

    return orm
}

export const ormClient = () => connectToDB();