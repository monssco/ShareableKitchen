import { Listing } from "../../entities/Listing/Listing";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Int, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User/User";
import { PropertyFeatures } from "../../entities/Enums/PropertyFeatures.enum";
import { PropertyType } from "../../entities/Enums/PropertyType.enum";
import { Availability } from "../../entities/Availability";

@InputType()
class ListingLocationInput {

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

    @Field(() => ListingLocationInput, {nullable: true})
    listingLocation: ListingLocationInput

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

            const newListing = new Listing(input.title, input.description)
            newListing.author = dbUser
            newListing.price = input.price
            newListing.sqFtArea = input.sqFtArea
            newListing.features = input.features
            newListing.propertyType = input.propertyType

            newListing.availability = input.availability

            // const location = new ListingLocation()
            // location.address = input.listingLocation.address
            // location.city = input.listingLocation.city
            // location.country = input.listingLocation.country
            // location.state = input.listingLocation.state
            

            // location.listing = newListing

            newListing.draft = false

            
            await em.persistAndFlush(newListing);
            return newListing
    }
}