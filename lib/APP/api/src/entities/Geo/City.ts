import {Field, InputType, ObjectType} from 'type-graphql';
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

    @PrimaryKey()
    id!: number;

    @Field()
    @Property()
    name!: string;

    [PrimaryKeyType]: [number, number, number];

    constructor(id: number, name: string ) {
        this.id = id
        this.name = name
    }
}