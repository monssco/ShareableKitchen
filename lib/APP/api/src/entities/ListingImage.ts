import { ManyToOne, Entity } from "@mikro-orm/core";
import { ObjectType } from "type-graphql";
import { Image } from "./Base/Image";
import { Listing } from "./Listing";

@ObjectType({implements: Image})
@Entity()
export class ListingImage extends Image {

    // One listing can have many images (upto 6 I am thinking, but maybe more)
    @ManyToOne(() => Listing)
    listing!: Listing;
}