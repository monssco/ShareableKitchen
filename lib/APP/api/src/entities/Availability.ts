/**
 * A user can book a listing.
 * User books listing. PK from user and booking as foregin key.
 */

import { Entity, OneToOne, PrimaryKeyType, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Listing } from "./Listing/Listing";

@ObjectType()
@Entity()
export class Availability {

    @OneToOne({primary: true})
    listing: Listing

    @Field()
    @Property({columnType: "timestamptz"})
    startDate: Date

    @Field()
    @Property({columnType: "timestamptz"})
    endDate: Date;

    [PrimaryKeyType] : string;

}