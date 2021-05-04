// TODO: Do these test cases.

// TODO: Finish these test cases.

import { MikroORM, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { testConn } from "../../test-utils/testConn"

let conn: MikroORM<IDatabaseDriver<Connection>>;

beforeAll(async () => {
    conn = await testConn();
})

afterAll(async () => {
    await conn.close();
})

describe("Message tests", () => {

    it("List Conversation", async () => {
    });

    it("Start Conversation", async () => {
    });

    it("List Messages", async () => {
    });

    it("Send Message", async () => {
    });
    
});