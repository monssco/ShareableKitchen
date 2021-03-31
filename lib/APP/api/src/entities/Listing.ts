import {Field, ID, ObjectType, registerEnumType} from 'type-graphql';
import {ArrayType, Entity, OneToMany, PrimaryKey, Property} from '@mikro-orm/core';
import { ListingImage } from './ListingImage';

@ObjectType()
@Entity()
export class Listing {
    @Field(() => ID)
    @PrimaryKey({nullable: false})
    id: string;

    @Field({nullable: false})
    @Property()
    title: string;

    @Field()
    @Property()
    description?: string;


    @Field()
    @OneToMany(()=> ListingImage, (image) => image.listing)
    photos?: ListingImage

    @Field()
    @Property()
    location?: string;

    @Field()
    @Property()
    price?: number;

    @Field(() => [Features])
    @Property({type: ArrayType, nullable: true})
    features?: Features[];

    @Field()
    @Property()
    propertyType?: PropertyType

    @Field()
    @Property()
    area?: number

    constructor(id: string, title: string ) {
        this.id = id
        this.title = title
    }
}

enum Features {
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

registerEnumType(Features,{
    name: "Features",
    description: "Features of a given kitchen"
})

enum PropertyType {
    cafe = "Cafe",
    church = "Church",
    commercialKitchen = "Commercial Kitchen",
    communityCenter = "Community Center",
    restaurant = "Restaurant"
}