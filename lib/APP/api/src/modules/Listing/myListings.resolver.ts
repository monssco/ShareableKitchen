import { Listing } from "../../entities/Listing/Listing"
import { User } from "../../entities/User/User"
import { MyContext } from "../../types"
import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, Query, Resolver, Root } from "type-graphql"
import { Availability } from "../../entities/Availability"
import { PropertyFeatures } from "../../entities/Enums/PropertyFeatures.enum"
import { PropertyType } from "../../entities/Enums/PropertyType.enum"

/**
 * TODO: Add support for location editing and editing pictures.
 */
@InputType()
class EditMyListingInput implements Partial<Listing> {

    @Field()
    id!: string

    @Field({nullable: true})
    title?: string

    @Field({nullable: true})
    description?: string

    @Field(()=> Availability, ({nullable: true}))
    availability?: Availability

    @Field(()=> Int, {nullable: true})
    price?: number

    @Field(()=> Int, {nullable: true})
    sqFtArea?: number

    @Field(()=> [PropertyFeatures], {nullable: true})
    features?: PropertyFeatures[]

    @Field(()=> PropertyType, {nullable: true})
    propertyType?:PropertyType
}

export class MyListingResolver {

    @Query(() => [Listing])
    async myListings(
        @Ctx() {em, user}: MyContext
    ){
        /**
         * First get the user from the database.
         * Then fetch all their listings.
         * 
         * TODO: Add arguments for pagination of listings.
         */
        const dbUser = await em.findOneOrFail(User, {id: user?.sub})
        const listings = await em.find(Listing, {author: dbUser})
        return listings
    }

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
    async editMyListing(
        @Arg("input", {description:"Required input for editing your own listing"}) input: EditMyListingInput,
        @Ctx() {em, user}: MyContext
    ) {
        const dbUser = await em.findOneOrFail(User, {id: user?.sub})
        const listing = await em.findOneOrFail(Listing, {id: input.id})

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
            listing.availability = input.availability
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

/**
 * Field resolver for availability attribute on the Listing class.
 */
@Resolver(() => Listing)
export class AvailabilityResolver {
    @FieldResolver(()=>Availability)
    async availability(
        @Root() listing: Listing,
        @Ctx() {em}: MyContext
    ): Promise<Availability> {
        return await em.findOneOrFail(Availability, {listing})
    }
}