import { Listing } from "../../../entities/Listing/Listing";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Int, Mutation, Resolver } from "type-graphql";
import { PropertyFeatures } from "../../../entities/Enums/PropertyFeatures.enum";
import { PropertyType } from "../../../entities/Enums/PropertyType.enum";
import { Availability } from "../../../entities/Availability/Availability";
import { City } from "../../../entities/Geo/City";
import { CheckPayoutsEnabled } from "../checkPayouts.resolver";

@InputType()
class CreateListingLocationInput {

    @Field()
    address!: string

    /**
     * Just from the city id you can figure out the rest.
     */
    @Field(()=> Int)
    cityId!: number

}

@InputType()
export class CreateListingInput implements Partial<Listing> {

    @Field()
    title!: string

    @Field()
    description!: string

    @Field(() => Int)
    unitPrice!: number

    @Field(() => Int)
    sqFtArea!: number

    @Field(() => [PropertyFeatures])
    features!: PropertyFeatures[]

    @Field(() => PropertyType)
    propertyType!: PropertyType

    @Field(() => CreateListingLocationInput)
    location!: CreateListingLocationInput

    @Field(() => Availability)
    availability!: Availability

}

@Resolver(()=> Listing)
export class CreateListingResolver {
    @Mutation(()=> Listing, {nullable: false, description:"Before creating a listing, check to see if this account has payouts enabled by calling arePayoutsEnabled query."})
    async createListing(
        @Arg("input", {nullable: false}) input: CreateListingInput,
        @Ctx() context: MyContext): Promise<Listing> {
            const {em, user} = context
            const dbUser = user

            /**
             * Without a payout source, you can't create a listing.
             */
            if(process.env.NODE_ENV === "test") {
                console.info("Skipping payout checks since this is a test.")
            } else {
                let payoutsEnabled = await new CheckPayoutsEnabled().arePayoutsEnabled(context)
                if (!payoutsEnabled) {
                    throw new Error("Payouts are not enabled, use the onboarding endpoint to add payout method first.")
                }
            }

            /**
             * Find the city first.
             */
            const city = await em.findOneOrFail(City, {id: input.location.cityId})

            /**
             * Create the availability schedule.
             */
            const availability = new Availability(input.availability.startDate, input.availability.endDate, input.availability.type)

            /**
             * Create the listing.
             */
            const newListing = new Listing(dbUser, input.title, input.description, availability, input.location.address)

            newListing.city = city

            newListing.unitPrice = input.unitPrice
            newListing.sqFtArea = input.sqFtArea
            newListing.features = input.features
            newListing.propertyType = input.propertyType


            newListing.draft = false
            newListing.active = true
            
            await em.persistAndFlush(newListing);
            return newListing
        }
    }