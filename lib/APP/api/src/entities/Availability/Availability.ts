/**
 * A listing has one availability.
 * Availability has a start date and end date.
 * Later on we can add more attributes here as our requirements grow.
 */

import { Entity, Enum, OneToOne, PrimaryKeyType, Property } from "@mikro-orm/core";
import { compareAsc, isFirstDayOfMonth, isMonday, isSunday, lastDayOfMonth } from "date-fns";
import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import { AvailabilityType } from "../Enums/AvailabilityType.enum";
import { Listing } from "../Listing/Listing";

@InputType("AvailabilityInput")
@ObjectType("AvailabilityObject")
@Entity()
export class Availability {

    @OneToOne(()=> Listing, listing => listing.availability, {owner: true, orphanRemoval: true, primary: true})
    listing: Listing

    @Field(()=> Date)
    @Property({columnType: "timestamptz"})
    startDate: Date

    @Field(()=> Date)
    @Property({columnType: "timestamptz"})
    endDate: Date;

    [PrimaryKeyType] : string;

    @Field(()=> AvailabilityType)
    @Enum(()=> AvailabilityType)
    type: AvailabilityType

    constructor(startDate: Date, endDate: Date, type: AvailabilityType ) {
        // This check exists because of schema generation.
        // Which passes in undefined values into the constructor to generate
        // graphql types.
        if(startDate && endDate && type) {
            if (compareAsc(startDate, endDate) !== -1) {
                throw new Error("Start date must precede the end date.")
            }

            if (type === AvailabilityType.monthly) {
                if (!isFirstDayOfMonth(startDate) || !lastDayOfMonth(endDate)) {
                    throw new Error("Start date must be start of month and end date must be end of month for month type.")
                }
            } else if (type === AvailabilityType.weekly) {
                if (!isMonday(startDate) || !isSunday(endDate)) {
                    throw new Error("Start date must be a monday and end date must be a sunday for week type.")
                }
            }
        }

        this.startDate = startDate
        this.endDate = endDate
        this.type = type
    }
}

/**
 * Register enum for type-graphql.
 */
registerEnumType(AvailabilityType,{
    name: "AvailabilityType",
    description: "Types of kitchen availability"
})