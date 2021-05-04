import { MikroORM, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { testConn } from "../../test-utils/testConn"
import faker from 'faker';
import { graphqlCall } from "../../test-utils/graphqlCall";
import { User } from "../../entities/User/User";
import { RegisterUserInput } from "./register/register.resolver";
import { UpdateUserInput } from "./update/update.resolver";

let conn: MikroORM<IDatabaseDriver<Connection>>;

beforeAll(async () => {
    conn = await testConn();
})

afterAll(async () => {
    await conn.close();
})

describe("User tests", () => {

    it("Register", async () => {
        const registerMutation = `
            mutation registerUser($data: RegisterUserInput!) {
                registerUser(
                    user: $data
                ) {
                    id
                    first_name
                    last_name
                    email
                    date_of_birth
                }
            }
        `;

        const userInput: Partial<RegisterUserInput> = {
            id: faker.datatype.uuid(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
        };

        const response = await graphqlCall({
            source: registerMutation,
            variableValues: {
                data: userInput
            }
        });

        if (response.errors) {
        console.log(response.errors[0].originalError);
        }

        expect(response).toMatchObject({
        data: {
            registerUser: {
                first_name: userInput.first_name,
                last_name: userInput.last_name,
                email: userInput.email
            }
        }
        });

        const dbUser = await conn.em.findOne(User, {email: userInput.email});
        expect(dbUser).toBeDefined();
        expect(dbUser!.status).toBeTruthy();
        expect(dbUser!.first_name).toBe(userInput.first_name);
    });

    it("Me", async () => {

        const meQuery = `
            query meQuery {
                me {
                    id
                    first_name
                    last_name
                    email
                }
            }
        `;

        let user = new User(faker.datatype.uuid(), faker.internet.email())
        user.first_name = faker.name.firstName()
        user.last_name = faker.name.lastName()

        await conn.em.persistAndFlush(user)

        const response = await graphqlCall({
            source: meQuery,
            user
        });

        if (response.errors) {
        console.log(response.errors[0].originalError);
        }

        expect(response).toMatchObject({
        data: {
            me: {
                id: user.id,
                email: user.email
            }
        }
        });

        const dbUser = await conn.em.findOne(User, user);
        expect(dbUser).toBeDefined();
        expect(dbUser!.id).toBe(user.id);
        expect(dbUser?.email).toBe(user.email);
        expect(dbUser!.first_name).toBe(user.first_name);
        expect(dbUser!.last_name).toBe(user.last_name)
    });

    it("Update", async () => {

        const updateMutation = `
            mutation updateUser($data: UpdateUserInput!) {
                updateUser(
                    user: $data
                ) {
                    id
                    first_name
                    last_name
                    date_of_birth
                    address
                }
            }
        `;

        let user = new User(faker.datatype.uuid(), faker.internet.email())
        await conn.em.persistAndFlush(user)

        const userInput: Partial<UpdateUserInput> = {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            location: {
                address: faker.address.streetAddress(true),
                cityId: 16151,
                postal: faker.address.zipCode()
            }
        };

        const response = await graphqlCall({
            source: updateMutation,
            variableValues: {
                data: userInput
            },
            user
        });

        if (response.errors) {
        console.log(response.errors[0].originalError);
        }

        expect(response).toMatchObject({
        data: {
            updateUser: {
                first_name: userInput.first_name,
                last_name: userInput.last_name,
                address: userInput.location?.address
            }
        }
        });

        const dbUser = await conn.em.findOne(User, user);
        expect(dbUser).toBeDefined();
        expect(dbUser!.address).toBe(userInput.location?.address);
        expect(dbUser!.first_name).toBe(userInput.first_name);
        expect(dbUser!.last_name).toBe(userInput.last_name)
        expect(dbUser?.city?.id).toBe(userInput.location?.cityId)
        expect(dbUser?.postal).toBe(userInput.location?.postal)
    });
});