import {Field, ID, ObjectType} from 'type-graphql';

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    email: string;

    @Field({nullable: true})
    first_name?: string;

    @Field({nullable: true})
    last_name: string;

    @Field({nullable: true})
    city: string;

    @Field({nullable: true})
    province: string;

    @Field({nullable: true})
    country: string

    @Field({nullable: true})
    stripe_customer: true

    @Field({nullable: true})
    stripe_account: true
}
