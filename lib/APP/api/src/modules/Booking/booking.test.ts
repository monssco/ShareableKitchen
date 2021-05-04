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

describe("Booking tests", () => {

    it("Create", async () => {
    });

    it("List Booking", async () => {
    });

    it("List Reservations", async () => {
    });
});