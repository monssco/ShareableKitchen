
/**
 * A user can book a listing.
 * User books listing. PK from user and booking as foregin key.
 */

import { Entity, ManyToOne, PrimaryKey, PrimaryKeyType, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { v4 } from "uuid";
import { Listing } from "../Listing/Listing";
import { User } from "../User/User";

@ObjectType()
@Entity()
export class Booking {

    @Field(()=> Listing)
    @ManyToOne(()=>Listing, {primary: true})
    listing: Listing

    @Field(() => User)
    @ManyToOne(() => User, {primary: true})
    buyer: User

    @PrimaryKey({nullable: false})
    id: string = v4();


    [PrimaryKeyType] : [string, string, string]

    /**
     * types Not finalized yet
     */
    @Field()
    @Property({columnType: "timestamptz"})
    startDate: Date;

    @Field()
    @Property({columnType: "timestamptz"})
    endDate: Date;

    @Field()
    @Property({columnType: "timestamptz"})
    created: Date = new Date();

    @Field()
    @Property({columnType: "timestamptz"})
    paymentDate: Date;


    /**
     * We will get this from stripe. This is how the payment info will be 
     * saved in our db.
     */
    @Property()
    paymentIntent: string




    constructor(listing: Listing, buyer: User, start: Date, end: Date, paymentDate: Date, paymentIntent: string) {
        this.listing = listing
        this.buyer = buyer
        this.startDate = start
        this.endDate = end
        this.paymentDate = paymentDate
        this.paymentIntent = paymentIntent
    }
}