import {Field, ID, ObjectType, registerEnumType, Int} from 'type-graphql';
import {Cascade, Collection, Entity, Enum, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property} from '@mikro-orm/core';
import { ListingImage } from './ListingImage';
import { ListingLocation } from './ListingLocation';
import { User } from '../User/User';
import {v4} from 'uuid';
import { PropertyFeatures } from '../Enums/PropertyFeatures.enum';
import { PropertyType } from '../Enums/PropertyType.enum'
import { Booking } from '../Booking/Booking';
import { Availability } from '../Availability';
import { Conversation } from '../Messages/Conversation';
/**
 * A listing is a kitchen that has been posted for rent.
 * 
 */

@ObjectType()
@Entity()
export class Listing {
    @Field(() => ID)
    @PrimaryKey()
    id: string = v4();

    @Field(() => User)
    @ManyToOne(() => User)
    author!: User;

    @Field()
    @Property()
    title: string;

    @Field()
    @Property()
    description: string;

    /**
     * A listing has 1 availability schedule.
     */
    @Field(()=> Availability)
    @OneToOne(() => Availability, availability => availability.listing)
    availability: Availability

    @Field(() => [ListingImage], {nullable: true})
    @OneToMany(()=> ListingImage, (image) => image.listing, {nullable: true})
    photos?: ListingImage[]

    /**
     * Keeping this nullable for now, until I can move it over to
     * just simple city.
     */
    @Field(()=> ListingLocation, {nullable: true})
    @OneToOne(()=> ListingLocation, (location) => location.listing, {owner: true, nullable: true})
    location: ListingLocation;

    @Field(() => Int)
    @Property()
    price: number;

    @Field(() => Int)
    @Property()
    sqFtArea: number

    @Field(() => [PropertyFeatures], {nullable: true})
    @Enum({items: () => PropertyFeatures, array: true, nullable: true})
    features?: PropertyFeatures[];

    @Field(() => PropertyType, {nullable: true})
    @Enum({items: () => PropertyType, nullable: true})
    propertyType: PropertyType

    /**
     * A listing can have many bookings on it.
     */
    @Field(()=> [Booking], {nullable: true})
    @OneToMany(() => Booking, booking => booking.listing, {nullable: true, cascade: [Cascade.ALL]})
    bookings = new Collection<Booking>(this);


    /**
     * If the listing is still a draft, this will be true.
     */
    @Field()
    @Property()
    draft: boolean

    @Property({columnType: "timestamptz"})
    published: Date = new Date();

    // Field decorator is emitted, this property will not be exposed via the api
    // timestampz = time with timezone in postgresql lingo
    @Property({columnType: "timestamptz"})
    created: Date = new Date();

    @Property({columnType: "timestamptz", onUpdate: () => new Date().toISOString()})
    modified: Date = new Date();

    @Property({columnType: "boolean"})
    active = true

    @OneToMany(()=>Conversation, convo => convo.listing)
    conversation: Conversation

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