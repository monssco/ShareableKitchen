import {Field, ID, ObjectType} from 'type-graphql';
import {Cascade, Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property} from '@mikro-orm/core';
import { UserImage } from './UserImage';
import { UserLocation } from './UserLocation';
import { Booking } from '../Booking/Booking';
import { Listing } from '../Listing/Listing';
import { Conversation } from '../Messages/Conversation';
import { Message } from '../Messages/Message';

// import { Message } from '../Messages/Message';

@ObjectType()
@Entity()
export class User {

    constructor(id: string, email: string ) {
        this.id = id
        this.email = email
    }

    @Field(() => ID, {nullable: false})
    @PrimaryKey()
    id!: string;

    /*
    A user is not allowed to update their email after sign up.
    */
    @Field({nullable: false})
    @Property()
    email!: string;

    /*
    https://mikro-orm.io/docs/relationships#onetoone
    */
    @Field(()=> UserImage, {nullable: true})
    @OneToOne(()=> UserImage, (image)=> image.user, {owner: true, nullable: true})
    profile_image?: UserImage;

    @Field(()=> UserLocation, {nullable: true})
    @OneToOne(()=> UserLocation, (image)=> image.user, {owner: true, nullable: true})
    location?: UserLocation;

    @Field({nullable: true})
    @Property({nullable: true})
    first_name?: string;

    @Field({nullable: true})
    @Property({nullable: true})
    last_name?: string;

    @Field({nullable: true})
    @Property({columnType: "date", nullable: true})
    date_of_birth?: Date;

    // Stripe related ids
    @Field()
    @Property({nullable: true})
    stripe_customer_id?: string

    @Field({nullable: true})
    @Property({nullable: true})
    stripe_account_id?: string

    // Field decorator is emitted, this property will not be exposed via the api
    // timestampz = time with timezone in postgresql lingo
    @Property({columnType: "timestamptz", nullable: false})
    created = new Date();


    @Property({columnType: "timestamptz", onUpdate: () => new Date().toISOString() })
    modified = new Date();

    @Property({columnType: "boolean"})
    status = true


    @OneToMany(()=> Listing, listing => listing.author, {nullable: true, cascade: [Cascade.ALL]})
    listings = new Collection<Listing>(this);

    @OneToMany(()=> Booking, booking => booking.buyer, {nullable: true, cascade: [Cascade.ALL]})
    bookings = new Collection<Booking>(this);

    /**
     * One user is involved in many conversations.
     */
    @OneToMany(() => Conversation, convo => convo.buyer)
    conversations = new Collection<Conversation>(this);

    @OneToMany(()=> Message, message => message.author)
    message = new Collection<Message>(this);

}
