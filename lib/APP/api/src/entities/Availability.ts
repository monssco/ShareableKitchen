/**
 * A listing has one availability.
 * Availability has a start date and end date.
 * Later on we can add more attributes here as our requirements grow.
 */

import { Entity, OneToOne, PrimaryKeyType, Property } from "@mikro-orm/core";
import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import { AvailabilityType } from "./Enums/AvailabilityType.enum";
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

    @Field(()=> AvailabilityType)
    @Property()
    type: AvailabilityType

    constructor(startDate: Date, endDate: Date, type: AvailabilityType ) {
        this.startDate = startDate
        this.endDate = endDate
        this.type = type
    }
}

registerEnumType(AvailabilityType,{
    name: "AvailabilityType",
    description: "Types of kitchen availability"
})