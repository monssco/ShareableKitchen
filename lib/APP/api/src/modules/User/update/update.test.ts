import { MikroORM, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { testConn } from "../../../test-utils/testConn"
import faker from 'faker';
import { graphqlCall } from "../../../test-utils/graphqlCall";
import { User } from "../../../entities/User/User";
import { UpdateUserInput } from "./update.resolver";

let conn: MikroORM<IDatabaseDriver<Connection>>;

beforeAll(async () => {
    conn = await testConn();
})

afterAll(async () => {
    await conn.close();
})

const registerMutation = `
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

describe("Update User", () => {
    

    it.only("update user", async () => {

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
            source: registerMutation,
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
        expect(dbUser!.last_name)
    });
});