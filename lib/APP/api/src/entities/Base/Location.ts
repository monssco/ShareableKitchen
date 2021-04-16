import { ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, InterfaceType } from "type-graphql";
import { City } from "../Geo/City";
import { Country } from "../Geo/Country";
import { State } from "../Geo/State";

/**
 * Base Location class, perhaps it can be used later on?
 */
@InterfaceType()
export class Location {

    @Field()
    @PrimaryKey()
    id!: string;

    @Field()
    @Property()
    address!: string

    /**
     * Crazy idea, what if you turn these into pk from the country
     * state and city tables?
     * Then you can search over these values as well. I think it will be pretty cool.
     * Check to see if OnetoOne is possible in this.
     * https://mikro-orm.io/docs/inheritance-mapping/
     */
    @Field(() => Country)
    @ManyToOne(() => Country)
    country!: Country;

    @Field(() => State)
    @ManyToOne(() => State)
    state!: State;

    @Field(() => City)
    @ManyToOne(() => City)
    city!: City;

    @Field({nullable: true})
    @Property({nullable: true})
    postal?: string;
}