import { ConnectionOptions, createConnection } from "typeorm";

export const createTypeormConn = async () => {

    console.log(__dirname)
    // TODO: Insert RDS related info in here when running production
    const connectionOptions: ConnectionOptions = {
        type: "postgres",
        host: "postgres", // If using docker, this host needs to be changed to postgres otherwise keep it localhost
        port: 5432,
        username: "test",
        password: "test",
        database: "test",
        synchronize: true,
        logging: true,
        entities: [
            `${__dirname}/../entity/**/*{.ts,.js}`
        ],
        migrations: [
            `${__dirname}/../migration/**/*.ts`
        ],
        subscribers: [
            `${__dirname}/../subscriber/**/*.ts`
        ],
        cli: {
            entitiesDir: `${__dirname}/entity`,
            migrationsDir: `${__dirname}/migration`,
            subscribersDir: `${__dirname}/subscriber`
        }
    }

    return createConnection({ ...connectionOptions, name: "default" });
};