import {Field, InputType, ObjectType} from 'type-graphql';
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
    
    // @Field(() => Country)
    @ManyToOne(() => Country, {primary: true})
    country!: Country;

    @PrimaryKey()
    id!: number;

    @Field()
    @Property({nullable: false})
    name!: string;

    @Field(() => [City], {nullable: true})
    @OneToMany(() => City, city => city.state, {cascade: [Cascade.ALL]})
    cities = new Collection<City>(this);

    [PrimaryKeyType]: [number, number];

    constructor(id: number, name: string, country:Country) {
        this.id = id
        this.country = country
        this.name = name
    }
}