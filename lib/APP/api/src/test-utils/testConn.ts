import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { seedDatabase } from '../utils/helpers';

import microConfig from '../../mikro-orm.config.test';

let orm: MikroORM<IDatabaseDriver<Connection>>

/**
 * Creates a connection for testing purposes.
 * @returns ORM client
 */
export const testConn = async () => {
    /**
     * Initialize orm using the config file.
     */
    if (!orm) {
        orm = await MikroORM.init(microConfig);
        await orm.getSchemaGenerator().dropSchema();
        await orm.getSchemaGenerator().createSchema();

        /**
         * Seed the database with info that is required.
         */
        await seedDatabase(orm.em);
    }

    return orm
}