/**
 * One user has many conversations.
 * One conversation has many messages.
 * Many conversations have 1 author?
 * 
 */

import { Entity, Property, ManyToOne, PrimaryKeyType, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { Listing } from "../Listing/Listing";
import { User } from "../User/User";
import { Message } from "./Message";

@Entity()
export class Conversation {

    /**
     * Conversation is always started by the buyer.
     * There should be a cleaner way to implement this...
     */
    @ManyToOne(()=> User, { primary: true})
    buyer: User

    @ManyToOne(()=> User, { primary: true})
    seller: User

    @ManyToOne(()=>Listing, {primary: true})
    listing: Listing

    @OneToMany(() => Message, message => message.conversation, { cascade: [Cascade.ALL], nullable: true })
    messages = new Collection<Message>(this);

    @Property({columnType: "timestamptz"})
    created: Date = new Date();

    [PrimaryKeyType] : [string, string, string]
}