import {Field, ID, ObjectType} from 'type-graphql';
import {DateType, Entity, PrimaryKey, Property} from '@mikro-orm/core';

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
    @Property() // Is this the right type of property?
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

    // Notice there are no field decorators, we don't want to expose this to the API
    @Property({type: DateType, nullable: false})
    created = new Date().toISOString();


    @Property({onUpdate: () => new Date().toISOString() })
    modified = new Date().toISOString();

    @Property()
    status!: boolean

}
