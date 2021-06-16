
/**
 * A user can book a listing.
 * User books listing. PK from user and booking as foregin key.
 */

import { ArrayType, Entity, Enum, ManyToOne, PrimaryKey, PrimaryKeyType, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { v4 } from "uuid";
import { AvailabilityType } from "../Enums/AvailabilityType.enum";
import { Listing } from "../Listing/Listing";
import { User } from "../User/User";

@ObjectType()
@Entity()
export class Booking {

    public static readonly BUYER_PERCENTAGE = 3;
    public static readonly SELLER_PERCENTAGE = 3;
    

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
     * Boolean flag for if the booking is confirmed or not.
     * Confirmation is only done after a payment intent has been successfully
     * paid. Which is verified via the webhook.
     */
    @Property()
    confirmed: boolean = false

    @Field(() => AvailabilityType)
    @Enum(()=> AvailabilityType)
    type: AvailabilityType

    /**
     * types Not finalized yet
     */
    @Field()
    @Property({columnType: "timestamptz"})
    startDate: Date;

    @Field()
    @Property({columnType: "timestamptz"})
    endDate: Date;

    /**
     * Price per unit of booking time. Look at booking type for more info.
     * 
     * Daily type, then this price is per day.
     * 
     * Weekly type, price is per week.
     * 
     * Monthly type, price is per month.
     * 
     * Keep in mind that listing price can change later on.
     */
    @Field(() => Int)
    @Property()
    unitPrice: number;


    /**
     * Number of units.
     * 
     * For days it will be number of days.
     * 
     * For weeks its number of weeks.
     * 
     * For months its number of months
     */
    @Field(() => Int)
    @Property()
    unitQuantity: number;

    /**
     * Daily:
     * unitPrice * number of days
     * 
     * Weekly:
     * unitPrice * number of weeks
     * 
     * Monthly:
     * unitPrice * 1 month
     */
    @Field(() => Int)
    @Property()
    calculatedAmount: number

    /**
     * Application fee that the buyer pays.
     */
    @Field(() => Int)
    @Property()
    buyerAppFee: number

    /**
     * Application which the seller pays.
     */
    @Field(() => Int)
    @Property()
    sellerAppFee: number

    @Field()
    @Property({columnType: "timestamptz"})
    created: Date = new Date();

    @Field({nullable: true})
    @Property({columnType: "timestamptz", nullable: true})
    paymentDate?: Date;

    /**
     * Payment intent is used to capture a buyer's payment.
     */
    @Property({nullable: true})
    paymentIntentId?: string

    /**
     * Subscription id used for recurring payments.
     */
    @Property({nullable: true})
    subscriptionId?: string

    /**
     * Transfer id are created when money goes from our stripe account to a buyers
     */
    @Property({nullable: true, type: ArrayType})
    transferId: string[] = []

    constructor(type: AvailabilityType, listing: Listing, buyer: User, start: Date, end: Date, unitPrice: number, unitQuantity: number, calculatedAmount: number, buyerAppFee: number, sellerAppFee: number){
        this.type = type
        this.listing = listing
        this.buyer = buyer
        this.startDate = start
        this.endDate = end
        this.unitPrice = unitPrice
        this.unitQuantity = unitQuantity
        this.calculatedAmount = calculatedAmount
        this.buyerAppFee = buyerAppFee
        this.sellerAppFee = sellerAppFee

    }


    confirmBooking() {
        this.paymentDate = new Date()
        this.confirmed = true
    }

}