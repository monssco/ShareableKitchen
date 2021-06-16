import {Field, InputType, Int, ObjectType} from 'type-graphql';
import {Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, PrimaryKeyType, Property} from '@mikro-orm/core';
import { Country } from './Country';
import { City } from './City';

/**
 * A state or province type.
 * One state has many cities.
 */
@InputType("StateInput")
@ObjectType("StateType")
@Entity()
export class State {
    
    @Field(() => Country)
    @ManyToOne(() => Country, {primary: true})
    country!: Country;

    @Field(() => Int)
    @PrimaryKey()
    id!: number;

    @Field()
    @Property()
    name!: string;

    @Field(() => [City], {nullable: true})
    @OneToMany(() => City, city => city.state, {cascade: [Cascade.ALL], nullable: true})
    cities = new Collection<City>(this);

    [PrimaryKeyType]: [number, number];

    constructor(id: number, name: string, country:Country) {
        console.log("Creating state", name)
        this.id = id
        this.name = name
        this.country = country
    }
}