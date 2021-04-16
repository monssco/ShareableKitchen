import { ManyToOne, Property } from "@mikro-orm/core";
import { Field, InterfaceType } from "type-graphql";
import { City } from "../Geo/City";

/**
 * Base Location class, perhaps it can be used later on?
 */
@InterfaceType()
export class Location {

    @Field()
    @Property()
    address!: string

    @Field(() => City)
    @ManyToOne(() => City)
    city!: City;

    /**
     * This is a hack solution for now.
     * Track this issue on github:
     * https://github.com/mikro-orm/mikro-orm/issues/1687
     */
    @Property({name: 'city_id'})
    city_id: number

    @Field({nullable: true})
    @Property({nullable: true})
    postal?: string;
}