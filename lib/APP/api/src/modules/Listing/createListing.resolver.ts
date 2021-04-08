import { Listing } from "../../entities/Listing/Listing";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Int, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User/User";
import { ListingLocation } from "../../entities/Listing/ListingLocation";
import { PropertyFeatures } from "../../entities/Enums/PropertyFeatures.enum";
import { PropertyType } from "../../entities/Enums/PropertyType.enum";
import { City } from "../../entities/Geo/City";
import { State } from "../../entities/Geo/State";
import { Country } from "../../entities/Geo/Country";

@InputType()
class ListingLocationInput implements Partial<ListingLocation> {

    @Field()
    address: string

    @Field(() => City)
    city: City

    @Field(() => State, {nullable: false})
    state: State

    @Field(() => Country, {nullable: false})
    country: Country
}

@InputType()
class CreateListingInput implements Partial<Listing> {

    @Field({nullable: false})
    title!: string

    @Field({nullable: false})
    description!: string

    @Field(() => Int, {nullable: false})
    price!: number

    @Field(() => Int)
    sqFtArea: number

    @Field(() => [PropertyFeatures])
    features: PropertyFeatures[]

    @Field(() => PropertyType, {nullable: false})
    propertyType: PropertyType

    @Field(() => ListingLocationInput, {nullable: false})
    listingLocation: ListingLocationInput

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

            const location = new ListingLocation()
            location.address = input.listingLocation.address
            location.city = input.listingLocation.city
            location.country = input.listingLocation.country
            location.state = input.listingLocation.state
            

            location.listing = newListing

            
            // await em.persistAndFlush(newListing);
            return newListing
    }
}