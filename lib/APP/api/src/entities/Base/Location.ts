import { PrimaryKey, Property } from "@mikro-orm/core";
import { Field, InterfaceType } from "type-graphql";
import { City } from "../Geo/City";
import { Country } from "../Geo/Country";
import { State } from "../Geo/State";

/**
 * Base Location class, perhaps it can be used later on?
 */
@InterfaceType()
export class Location {

    @Field({nullable: false})
    @PrimaryKey()
    id!: string;

    @Field({nullable: false})
    @Property()
    address!: string

    @Field(() => Country, {nullable: false})
    @Property({nullable: false})
    country!: Country;

    @Field(() => State, {nullable: false})
    @Property({nullable: false})
    state!: State;

    @Field(() => City, {nullable: false})
    @Property({nullable: false})
    city!: City;

    @Field()
    @Property()
    postal?: string;
}