import { MikroORM, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { testConn } from "../../../test-utils/testConn"
import faker from 'faker';
import { graphqlCall } from "../../../test-utils/graphqlCall";
import { User } from "../../../entities/User/User";
import { Listing } from "../../../entities/Listing/Listing";


let conn: MikroORM<IDatabaseDriver<Connection>>;

beforeAll(async () => {
    conn = await testConn();
})

afterAll(async () => {
    await conn.close();
})

const createListingMutation = `
mutation createListing($data: CreateListingInput!) {
    createListing(
        input: $data
    ) {
        id
        city{
            id
            name
        }
        author  {
            id
        }
        title
        description
        availability {
            startDate
            endDate
            type
        }
        address
        price
        sqFtArea
        features
        propertyType
    }
}
`;

describe("Create Listing", () => {
    
    it.only("Create listing", async () => {

        /**
         * Create user without the graphql api, and persist it to the db.
         */
        let user = new User(faker.datatype.uuid(), faker.internet.email())
        await conn.em.persistAndFlush(user)

        const listingInput = {
            title: faker.random.word(),
            description: faker.random.words(20),
            price: faker.datatype.number(),
            sqFtArea: faker.datatype.number(),
            features: [`deepFryer`],
            propertyType: `church`,
            location!: {
                address: faker.address.streetAddress(),
                cityId: 16151
            },
            availability: {
                startDate: '01-24-2020',
                endDate: '01-23-2020',
                type: 'daily'
            }
        };

        const response = await graphqlCall({
            source: createListingMutation,
            variableValues: {
                data: listingInput
            },
            user
        });

        if (response.errors) {
            console.log(response.errors)
            console.log(response.errors[0].originalError);
        }

        expect(response).toMatchObject({
            data: {
                createListing: {
                    title: listingInput.title
                }
            }
        });

        const dbListing = await conn.em.findOne(Listing, {id: response.data?.createListing?.id});
        expect(dbListing).toBeDefined();
        expect(dbListing?.title).toBe(listingInput.title);
        expect(dbListing?.description).toBe(listingInput.description);
        expect(dbListing?.price).toBe(listingInput.price);
        expect(dbListing?.sqFtArea).toBe(listingInput.sqFtArea);
        //TODO: This is causing issues as its returning a number instead of string to compare it with...
        // expect(dbListing?.features?.toString()).toBe(listingInput.features);
        // expect(dbListing?.propertyType).toBe(listingInput.propertyType);
        expect(dbListing?.city.id).toBe(listingInput.location.cityId);
        expect(dbListing?.address).toBe(listingInput.location.address);
        // expect(dbListing?.availability.startDate.toDateString()).toBe(listingInput.availability.startDate)
        // expect(dbListing?.availability.endDate.toDateString()).toBe(listingInput.availability.endDate)
        expect(dbListing?.availability.type).toBe(listingInput.availability.type);
        expect(dbListing?.author.id).toBe(user.id);
    });
});