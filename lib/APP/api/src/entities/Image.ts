import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

/**
 * Base image class, every image class will extend this class and
 * add its own relations.
 */
@ObjectType()
@Entity()
export class Image {

    @Field({nullable: false})
    @PrimaryKey()
    original_key!: string;

    @Field()
    @Property()
    resized_medium?: string;

    @Field()
    @Property()
    resized_small?: string;

    @Field()
    @Property()
    resized_large?: string;

}