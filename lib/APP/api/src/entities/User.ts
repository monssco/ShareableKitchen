import {Field, ID, ObjectType} from 'type-graphql';
import {Entity, OneToOne, PrimaryKey, Property} from '@mikro-orm/core';
import { ProfileImage } from './ProfileImage';
import { UserLocation } from './UserLocation';

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
    @Field(()=> ProfileImage, {nullable: true})
    @OneToOne(()=> ProfileImage, (image)=> image.user, {owner: true, nullable: true})
    profile_image?: ProfileImage;

    @Field(()=> UserLocation, {nullable: true})
    @OneToOne(()=> UserLocation, (image)=> image.user, {owner: true, nullable: true})
    location?: UserLocation;

    @Field()
    @Property({nullable: true})
    first_name?: string;

    @Field()
    @Property({nullable: true})
    last_name?: string;

    @Field()
    @Property({columnType: "date", nullable: true})
    date_of_birth?: Date;

    // Stripe related ids
    @Field()
    @Property({nullable: true})
    stripe_customer_id?: string

    @Field()
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

}
