
/**
 * A user can book a listing.
 */

import { Entity, PrimaryKey } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Booking {
    @PrimaryKey()
    id!: string;

    @Field()
    buyer!: string
    /**
     * id
     * buyer
     * seller
     * listing
     * start_date
     * end_date
     * payment_id
     * payment_date
     * 
     */
}