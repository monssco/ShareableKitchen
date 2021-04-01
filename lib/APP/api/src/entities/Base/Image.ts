import { PrimaryKey, Property } from "@mikro-orm/core";
import { Field, InterfaceType } from "type-graphql";

/**
 * Base image class, every image class will extend this class and
 * add its own relations.
 */
@InterfaceType()
export abstract class Image {

    @Field({nullable: false})
    @PrimaryKey()
    original_key!: string;

    @Field()
    @Property({nullable: true})
    resized_medium?: string;

    @Field()
    @Property({nullable: true})
    resized_small?: string;

    @Field()
    @Property({nullable: true})
    resized_large?: string;

}