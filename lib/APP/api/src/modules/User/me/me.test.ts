import { MikroORM, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { testConn } from "../../../test-utils/testConn"
import faker from 'faker';
import { graphqlCall } from "../../../test-utils/graphqlCall";
import { User } from "../../../entities/User/User";

let conn: MikroORM<IDatabaseDriver<Connection>>;

beforeAll(async () => {
    conn = await testConn();
})

afterAll(async () => {
    await conn.close();
})

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

describe("Update User", () => {
    
    it("update user", async () => {

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
});