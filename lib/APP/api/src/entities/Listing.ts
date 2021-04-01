import {Field, ID, ObjectType, registerEnumType} from 'type-graphql';
import {Entity, Enum, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property} from '@mikro-orm/core';
import { ListingImage } from './ListingImage';
import { ListingLocation } from './ListingLocation';
import { User } from './User';

/**
 * TODO: Add availability OR calender option
 */

@ObjectType()
@Entity()
export class Listing {
    @Field(() => ID, {nullable: false})
    @PrimaryKey({nullable: false})
    id!: string;

    @Field(() => User, {nullable: false})
    @ManyToOne(() => User, {nullable: false})
    author!: User;

    @Field()
    @Property()
    title?: string;

    @Field()
    @Property()
    description?: string;


    @Field()
    @OneToMany(()=> ListingImage, (image) => image.listing)
    photos?: ListingImage

    @Field(()=> ListingLocation)
    @OneToOne(()=> ListingLocation, (location) => location.listing, {owner: true})
    location?: ListingLocation;

    @Field()
    @Property()
    price?: number;

    @Field(() => [PropertyFeatures])
    @Enum({items: () => PropertyFeatures, array: true})
    features?: PropertyFeatures[];

    @Field(() => PropertyType)
    @Enum({items: () => PropertyType})
    propertyType?: PropertyType

    @Field()
    @Property({nullable: true})
    sqFtArea?: number

    @Property({columnType: "timestamptz", nullable: false})
    published: Date = new Date();

    // Field decorator is emitted, this property will not be exposed via the api
    // timestampz = time with timezone in postgresql lingo
    @Property({columnType: "timestamptz", nullable: false})
    created: Date = new Date();

    @Property({columnType: "timestamptz", onUpdate: () => new Date().toISOString() })
    modified: Date = new Date();

    @Property({columnType: "boolean"})
    status = true

    constructor(id: string, title: string ) {
        this.id = id
        this.title = title
    }
}

enum PropertyFeatures {
    microwave =  "Microwave",
    conveyorOven = "Conveyor Oven",
    tripleSink = "Triple Sink",
    doughSheeter = "Dough Sheeter",
    standUpCooler = "Stand-up Cooler",
    walkInCooler = "Walk-in Cooler",
    stonePizzaOven = "Stone Pizza Oven",
    kitchenOven = "Kitchen Oven",
    doubleSink = "Double Sink",
    freezer = "Freezer",
    prepTables = "Prep Tables",
    deepFryer = "Deep Fryer",
    other = "Other - Found in description",
    doughMixer = "Dough Mixer"
}

registerEnumType(PropertyFeatures,{
    name: "PropertyFeatures",
    description: "Features of a given kitchen"
})

enum PropertyType {
    cafe = "Cafe",
    church = "Church",
    commercialKitchen = "Commercial Kitchen",
    communityCenter = "Community Center",
    restaurant = "Restaurant"
}

registerEnumType(PropertyType, {
    name: "PropertyType",
    description: "Self-explanatory"
})