import { Entity, OneToOne } from "@mikro-orm/core";
import { ObjectType } from "type-graphql";
import { Listing } from "./Listing";
import {Location} from './Base/Location';


@ObjectType({implements: Location})
@Entity()
export class ListingLocation extends Location {

    @OneToOne(() => Listing, (listing) => listing.location)
    listing!: Listing;
}