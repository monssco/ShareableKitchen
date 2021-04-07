import {Field, ID, ObjectType, registerEnumType, Int} from 'type-graphql';
import {Entity, Enum, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property} from '@mikro-orm/core';
import { ListingImage } from './ListingImage';
import { ListingLocation } from './ListingLocation';
import { User } from './User';
import {v4} from 'uuid';
import { PropertyFeatures } from './Enums/PropertyFeatures.enum';
import { PropertyType } from './Enums/PropertyType.enum'

/**
 * A listing is a kitchen that has been posted for rent.
 * TODO: Add availability options such as a calendar or start-end date etc
 */

@ObjectType()
@Entity()
export class Listing {
    @Field(() => ID, {nullable: false})
    @PrimaryKey({nullable: false})
    id: string = v4();

    @Field(() => User, {nullable: false})
    @ManyToOne(() => User, {nullable: false})
    author!: User;

    @Field()
    @Property()
    title: string;

    @Field()
    @Property()
    description: string;


    @Field(() => [ListingImage])
    @OneToMany(()=> ListingImage, (image) => image.listing, {nullable: true})
    photos?: ListingImage[]

    @Field(()=> ListingLocation)
    @OneToOne(()=> ListingLocation, (location) => location.listing, {owner: true})
    location: Partial<ListingLocation>;

    @Field(() => Int)
    @Property()
    price: number;

    @Field(() => Int)
    @Property()
    sqFtArea: number

    @Field(() => [PropertyFeatures])
    @Enum({items: () => PropertyFeatures, array: true, nullable: true})
    features?: PropertyFeatures[];

    @Field(() => PropertyType)
    @Enum({items: () => PropertyType})
    propertyType: PropertyType

    @Property({columnType: "timestamptz"})
    published: Date = new Date();

    // Field decorator is emitted, this property will not be exposed via the api
    // timestampz = time with timezone in postgresql lingo
    @Property({columnType: "timestamptz"})
    created: Date = new Date();

    @Property({columnType: "timestamptz", onUpdate: () => new Date().toISOString()})
    modified: Date = new Date();

    @Property({columnType: "boolean"})
    status = true

    constructor(title: string, description: string ) {
        this.title = title
        this.description = description
    }
}


registerEnumType(PropertyFeatures,{
    name: "PropertyFeatures",
    description: "Features of a given kitchen"
})


registerEnumType(PropertyType, {
    name: "PropertyType",
    description: "Self-explanatory"
})