
/**
 * A user can book a listing.
 * User books listing. PK from user and booking as foregin key.
 */

import { Entity, ManyToOne, PrimaryKey, PrimaryKeyType } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";
import { v4 } from "uuid";
import { Listing } from "../Listing/Listing";
import { User } from "../User/User";

@ObjectType()
@Entity()
export class Booking {

    @ManyToOne(()=>Listing, {primary: true})
    listing: Listing

    @ManyToOne(() => User, {primary: true})
    buyer: User

    @Field(() => ID)
    @PrimaryKey({nullable: false})
    id: string = v4();


    [PrimaryKeyType] : [string, string, string]

    /**
     * types Not finalized yet
     */
    startDate: string;

    endDate: string;

    paymentId: string;

    paymentDate: string;
}