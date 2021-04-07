import {Field, InputType, ObjectType} from 'type-graphql';
import {Entity, ManyToOne, PrimaryKey, Property} from '@mikro-orm/core';
import { State } from './State';

/**
 * A city type.
 * 
 */

@InputType("CityInput")
@ObjectType("CityType")
@Entity()
export class City {

    @Field(() => State)
    @ManyToOne({primary: true})
    state!: State

    @PrimaryKey({nullable: false})
    id!: number;

    @Field()
    @Property({nullable: false})
    name!: string;

    @Field()
    @Property({nullable: false})
    currency!: string

    @Field()
    @Property({nullable: false})
    currencySymbol!: string

    constructor(id: number, name: string, currency: string, currencySymbol: string ) {
        this.id = id
        this.name = name
        this.currency = currency
        this.currencySymbol = currencySymbol
    }
}