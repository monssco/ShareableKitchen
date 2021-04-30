import { Listing } from "../../entities/Listing/Listing"
import { MyContext } from "../../types"
import { Arg, Ctx, Field, InputType, Int, Mutation, } from "type-graphql"
import { Availability } from "../../entities/Availability"
import { PropertyFeatures } from "../../entities/Enums/PropertyFeatures.enum"
import { PropertyType } from "../../entities/Enums/PropertyType.enum"
import { City } from "../../entities/Geo/City"


@InputType()
class EditListingLocationInput {

    @Field({nullable: true})
    address: string

    @Field({nullable: true})
    cityId: number
}

/**
 * TODO: Add support for editing pictures.
 */
@InputType()
class EditListingInput implements Partial<Listing> {

    @Field()
    id!: string

    @Field({nullable: true})
    title?: string

    @Field({nullable: true})
    description?: string

    @Field(()=> Availability, ({nullable: true}))
    availability?: Availability

    @Field({nullable: true})
    address?: string

    @Field(() => EditListingLocationInput, {nullable: true})
    location?: EditListingLocationInput

    @Field({nullable: true})
    postal?: string

    @Field(()=> Int, {nullable: true})
    price?: number

    @Field(()=> Int, {nullable: true})
    sqFtArea?: number

    @Field(()=> [PropertyFeatures], {nullable: true})
    features?: PropertyFeatures[]

    @Field(()=> PropertyType, {nullable: true})
    propertyType?:PropertyType
}


export class EditListingResolver {
    /**
     * Things you can edit:
     * Title
     * Description
     * Availability
     * Photos
     * Location
     * Price
     * SqFt Area
     * Features
     * PropertyType
     * @param param0 listing
     */
    @Mutation(() => Listing)
    async editListing(
        @Arg("input") input: EditListingInput,
        @Ctx() {em, user}: MyContext
    ) {
        const dbUser = user

        const listing = await em.findOneOrFail(Listing, {id: input.id})

        
        console.log(listing);

        if (listing.author != dbUser) {
            throw Error('Not your listing >:(')
        }

        if (input.title) {
            listing.title = input.title
        }

        if (input.description) {
            listing.description = input.description
        }

        if (input.availability) {
            listing.availability.startDate = input.availability.startDate
            listing.availability.endDate = input.availability.endDate
        }

        if (input.location){
            const city = await em.findOneOrFail(City, {id: input.location.cityId})
            listing.city = city
            
            if (input.location.address) {
                listing.address = input.location.address
            }
        }

        if (input.price) {
            listing.price = input.price
        }

        if (input.sqFtArea) {
            listing.sqFtArea = input.sqFtArea
        }

        if (input.features) {
            listing.features = input.features
        }

        if (input.propertyType) {
            listing.propertyType = input.propertyType
        }

        await em.persistAndFlush(listing)


        return listing

    }
}