import {Field, ID, ObjectType, registerEnumType, Int} from 'type-graphql';
import { Property} from '@mikro-orm/core';
import { ListingImage } from './ListingImage';
import {v4} from 'uuid';
import { PropertyFeatures } from '../Enums/PropertyFeatures.enum';
import { PropertyType } from '../Enums/PropertyType.enum'
import { Availability } from '../Availability';
import { City } from '../Geo/City';
import { PublicUser } from '../User/PublicUser';
import { Listing } from './Listing';
/**
 * A listing is a kitchen that has been posted for rent.
 * 
 */

@ObjectType()
export class PublicListing extends Listing {
    @Field(() => ID)
    id: string = v4();

    @Field(() => PublicUser)
    author!: PublicUser;

    @Field()
    title!: string;

    @Field()
    description!: string;

    /**
     * A listing has 1 availability schedule.
     */
    @Field(()=> Availability)
    availability!: Availability

    @Field(() => [ListingImage], {nullable: true})
    photos?: ListingImage[]

    @Field()
    address!: string

    @Field(() => City, {nullable: true})
    city!: City;

    @Field({nullable: true})
    postal?: string;

    @Field(() => Int)
    price!: number;

    @Field(() => Int)
    sqFtArea!: number

    @Field(() => [PropertyFeatures], {nullable: true})
    features?: PropertyFeatures[];

    @Field(() => PropertyType, {nullable: true})
    propertyType?: PropertyType

    @Property({columnType: "timestamptz"})
    published: Date = new Date();

}


registerEnumType(PropertyFeatures,{
    name: "PropertyFeatures",
    description: "Features of a given kitchen"
})


registerEnumType(PropertyType, {
    name: "PropertyType",
    description: "Self-explanatory"
})