import {Field, ID, ObjectType} from 'type-graphql';
import {Entity, PrimaryKey, Property} from '@mikro-orm/core';

@ObjectType()
@Entity()
export class User {

    constructor(id: string, email: string ) {
        this.id = id
        this.email = email
    }

    @Field(() => ID)
    @PrimaryKey()
    id!: string;

    @Field({nullable: true})
    @Property()
    first_name?: string;

    @Field({nullable: true})
    @Property()
    last_name?: string;

    @Field()
    @Property()
    email!: string;

    @Field({nullable: true})
    @Property({columnType: "date"})
    date_of_birth?: Date;

    // Good idea to have them separate or all together?
    @Field({nullable: true})
    @Property()
    city?: string;

    @Field({nullable: true})
    @Property()
    province?: string;

    @Field({nullable: true})
    @Property()
    country?: string

    // Stripe related ids
    @Field({nullable: true})
    @Property()
    stripe_customer_id?: string

    @Field({nullable: true})
    @Property()
    stripe_account_id?: string

    // Field decorator is emitted, this property will not be exposed via the api
    // timestampz = time with timezone in postgresql lingo
    @Property({columnType: "timestamptz", nullable: false})
    created = new Date().toUTCString();


    @Property({columnType: "timestamptz" ,onUpdate: () => new Date().toISOString() })
    modified = new Date().toUTCString();

    @Property()
    status!: boolean

}
