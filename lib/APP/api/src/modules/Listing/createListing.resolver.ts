import { Listing } from "../../entities/Listing/Listing";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Int, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User/User";
import { PropertyFeatures } from "../../entities/Enums/PropertyFeatures.enum";
import { PropertyType } from "../../entities/Enums/PropertyType.enum";
import { Availability } from "../../entities/Availability";
import { City } from "../../entities/Geo/City";

@InputType()
class LocationInput {

    @Field()
    address: string

    @Field()
    cityId: number

    @Field()
    stateId: number

    @Field()
    countryId: number
}

@InputType()
class CreateListingInput implements Partial<Listing> {

    @Field()
    title!: string

    @Field()
    description!: string

    @Field(() => Int)
    price!: number

    @Field(() => Int)
    sqFtArea: number

    @Field(() => [PropertyFeatures])
    features: PropertyFeatures[]

    @Field(() => PropertyType)
    propertyType: PropertyType

    @Field(() => LocationInput)
    locationInput: LocationInput

    @Field(() => Availability)
    availability: Availability

}

@Resolver()
export class CreateListingResolver {
    @Mutation(()=> Listing, {nullable: false})
    async createListing(
        @Arg("input", {nullable: false}) input: CreateListingInput,
        @Ctx() {em, user}: MyContext): Promise<Listing> {
            const dbUser = await em.findOneOrFail(User, {id: user?.sub})

            const city = await em.findOneOrFail(City, {id: input.locationInput.cityId, state: {id: input.locationInput.stateId, country: input.locationInput.countryId}})
            console.log(city);

            

            const availability = new Availability(input.availability.startDate, input.availability.endDate)
            const newListing = new Listing(dbUser, input.title, input.description, availability, input.locationInput.address)

            // newListing.city = city
            // newListing.city.state = city.state
            // newListing.city.state.country = city.state.country
            newListing.price = input.price
            newListing.sqFtArea = input.sqFtArea
            newListing.features = input.features
            newListing.propertyType = input.propertyType


            newListing.draft = false
            newListing.active = true

            await em.persistAndFlush(newListing);
            return newListing
    }
}