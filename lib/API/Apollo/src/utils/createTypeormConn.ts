// import { User } from '../entity/User';

// export const createTypeormConn = async () => {

//     // console.log(__dirname)
//     // // TODO: Insert RDS related info in here when running production
//     // const connectionOptions: ConnectionOptions = {
//     //     type: "postgres",
//     //     host: "shareablekitchen.clpa0cpp0ry1.us-east-1.rds.amazonaws.com", // If using docker, this host needs to be changed to postgres otherwise keep it localhost
//     //     port: 5432,
//     //     username: "test",
//     //     password: "postgres1234",//postgres1234
//     //     database: "postgres",
//     //     synchronize: true,
//     //     logging: true,
//     //     entities: [
//     //         `${__dirname}/../entity/**/*.js`
//     //     ],
//     //     migrations: [
//     //         `${__dirname}/../migration/**/*.ts`
//     //     ],
//     //     subscribers: [
//     //         `${__dirname}/../subscriber/**/*.ts`
//     //     ],
//     //     cli: {
//     //         entitiesDir: `${__dirname}/entity`,
//     //         migrationsDir: `${__dirname}/migration`,
//     //         subscribersDir: `${__dirname}/subscriber`
//     //     }
//     // }

//     // return createConnection({ ...connectionOptions, name: "default" });

//     const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
//     return process.env.NODE_ENV === "production"
//         ? createConnection({
//             ...connectionOptions,
//             url: process.env.DATABASE_URL || "shareablekitchen.clpa0cpp0ry1.us-east-1.rds.amazonaws.com",
//             entities: [User],
//             name: "default"
//         } as any)
//         : createConnection({ ...connectionOptions, name: "default" });
// };