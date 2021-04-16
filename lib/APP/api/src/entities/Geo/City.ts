import {Field, InputType, Int, ObjectType} from 'type-graphql';
import {Entity, ManyToOne, PrimaryKey, PrimaryKeyType, Property} from '@mikro-orm/core';
import { State } from './State';

/**
 * A city type.
 * 
 */

@InputType("CityInput")
@ObjectType("CityType")
@Entity()
export class City {

    @ManyToOne(()=> State, {primary: true})
    state!: State

    @Field(() => Int)
    @PrimaryKey()
    id!: number;

    @Field()
    @Property()
    name!: string;

    [PrimaryKeyType]: [number, number, number];

    constructor(id: number, name: string, state: State ) {
        this.id = id
        this.name = name
        this.state = state
    }
}