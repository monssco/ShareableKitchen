import { PrimaryKey, Property } from "@mikro-orm/core";
import { Field, InterfaceType } from "type-graphql";

/**
 * Base Location class, perhaps it can be used later on?
 */
@InterfaceType()
export class Location {

    @Field({nullable: false})
    @PrimaryKey()
    original_key!: string;

    @Field()
    @Property()
    country?: string;

    @Field()
    @Property()
    city?: string;

    @Field()
    @Property()
    province?: string;

    @Field()
    @Property()
    postal?: string;
}