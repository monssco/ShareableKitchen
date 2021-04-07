import { PrimaryKey, Property } from "@mikro-orm/core";
import { Field, InterfaceType } from "type-graphql";
import { v4 } from "uuid";

/**
 * Base image class, every image class will extend this class and
 * add its own relations.
 */
@InterfaceType()
export abstract class Image {

    @PrimaryKey({nullable: false})
    id: string = v4();

    @Field({nullable: false})
    @Property({nullable: false})
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