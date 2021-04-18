/**
 * One user has many conversations.
 * One conversation has many messages.
 * Many conversations have 1 author?
 * 
 */

import { Entity, Property, ManyToOne, PrimaryKeyType, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { v4 } from "uuid";
import { Listing } from "../Listing/Listing";
import { User } from "../User/User";
import { Message } from "./Message";

@ObjectType()
@Entity()
export class Conversation {

    /**
     * Conversation is always started by the buyer.
     * There should be a cleaner way to implement this...
     */
    @Field(() => User)
    @ManyToOne(()=> User, { primary: true})
    buyer: User

    @Field(() => User)
    @ManyToOne(()=> User, { primary: true})
    seller: User

    @Field(() => Listing)
    @ManyToOne(()=>Listing, {primary: true})
    listing: Listing

    @Field()
    @Property()
    id: string = v4();

    @Field(() => [Message])
    @OneToMany(() => Message, message => message.conversation, { cascade: [Cascade.ALL], nullable: true })
    messages = new Collection<Message>(this);

    @Property({columnType: "timestamptz"})
    created: Date = new Date();

    [PrimaryKeyType] : [string, string, string]

    constructor(buyer: User, seller: User, listing: Listing) {
        this.buyer = buyer
        this.seller = seller
        this.listing = listing
    }
}