/**
 * A listing has one availability.
 * Availability has a start date and end date.
 * Later on we can add more attributes here as our requirements grow.
 */

import { Entity, OneToOne, PrimaryKeyType, Property } from "@mikro-orm/core";
import { Field, InputType, ObjectType } from "type-graphql";
import { Listing } from "./Listing/Listing";

@InputType("AvailabilityInput")
@ObjectType("AvailabilityObject")
@Entity()
export class Availability {

    @OneToOne(()=> Listing, listing => listing.availability, {owner: true, orphanRemoval: true, primary: true})
    listing: Listing

    @Field()
    @Property({columnType: "timestamptz"})
    startDate: Date

    @Field()
    @Property({columnType: "timestamptz"})
    endDate: Date;

    [PrimaryKeyType] : string;

    constructor(startDate: Date, endDate: Date ) {
        this.startDate = startDate
        this.endDate = endDate
    }
}