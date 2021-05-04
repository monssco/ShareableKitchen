import { MikroORM, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { testConn } from "../../../test-utils/testConn"
import faker from 'faker';
import { graphqlCall } from "../../../test-utils/graphqlCall";
import { User } from "../../../entities/User/User";
import { RegisterUserInput } from "./register.resolver";

let conn: MikroORM<IDatabaseDriver<Connection>>;

beforeAll(async () => {
    try {
        conn = await testConn();
    } catch (error) {
        console.error("ERROR: ", error)
    }
})

afterAll(async () => {
    await conn.close();
})

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

describe("Register", () => {
    it("create user", async () => {
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
});