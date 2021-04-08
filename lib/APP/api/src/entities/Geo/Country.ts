import {Field, ID, InputType, ObjectType} from 'type-graphql';
import {Cascade, Collection, Entity, OneToMany, PrimaryKey, Property} from '@mikro-orm/core';
import { State } from './State';

/**
 * A country type.
 * One country has many states.
 * A country has a set currency, currencyId.
 */

@InputType("CountryInput")
@ObjectType("CountryType")
@Entity()
export class Country {
    @Field(() => ID, {nullable: false})
    @PrimaryKey({nullable: false})
    id!: number;

    @Field({nullable: false})
    @Property({nullable: false})
    name!: string;

    @Field({nullable: false})
    @Property({nullable: false})
    currency!: string

    @Field({nullable: false})
    @Property({nullable: false})
    currencySymbol!: string

    @Field(() => [State])
    @OneToMany(() => State, state => state.country, { cascade: [Cascade.ALL] })
    states = new Collection<State>(this);

    constructor(id: number, name: string, currency: string, currencySymbol: string ) {
        this.id = id
        this.name = name
        this.currency = currency
        this.currencySymbol = currencySymbol
    }
}