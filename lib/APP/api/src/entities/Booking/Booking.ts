
/**
 * A user can book a listing.
 * User books listing. PK from user and booking as foregin key.
 */

import { Entity, ManyToOne, PrimaryKey, PrimaryKeyType, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
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

    @Field(() => Int)
    @Property()
    price: number;

    @Field(() => Int)
    @Property()
    applicationFee: number

    @Field()
    @Property({columnType: "timestamptz"})
    created: Date = new Date();

    @Field({nullable: true})
    @Property({columnType: "timestamptz", nullable: true})
    paymentDate: Date;


    /**
     * We will get this from stripe. This is how the payment info will be 
     * saved in our db.
     */
    @Property({nullable: true})
    paymentIntentId?: string

    /**
     * Transfer id are created when money goes from our stripe account to a buyers
     */
    @Property({nullable: true})
    transferId?: string

    /**
     * Boolean flag for if the booking is confirmed or not.
     * Confirmation is only done after a payment intent has been successfully
     * paid. Which is verified via the webhook.
     */
    @Property()
    confirmed: boolean



    constructor(listing: Listing, buyer: User, start: Date, end: Date, price: number, applicationFee: number, paymentIntentId: string) {
        this.listing = listing
        this.buyer = buyer
        this.startDate = start
        this.endDate = end
        this.price = price
        this.paymentIntentId = paymentIntentId
        this.applicationFee = applicationFee
        this.confirmed = false
    }

    confirmBooking() {
        this.paymentDate = new Date()
        this.confirmed = true
    }
}