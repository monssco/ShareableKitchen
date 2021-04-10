/**
 * One user has many conversations.
 * One conversation has many messages.
 * Many conversations have 1 author?
 * 
 */

import { Entity, Property } from "@mikro-orm/core";
// import { Listing } from "../Listing/Listing";
// import { User } from "../User/User";
// import { Message } from "./Message";

@Entity()
export class Conversation {

    /**
     * Conversation is always started by the buyer.
     * There should be a cleaner way to implement this...
     */
    // @ManyToOne(()=> User, {primary: true})
    // author: User

    // @OneToOne(()=>Listing, listing => listing.conversation, {owner: true, orphanRemoval: true, cascade: [Cascade.ALL]})
    // listing: Listing

    // @OneToMany(() => Message, message => message.conversation, { cascade: [Cascade.ALL], nullable: true })
    // messages = new Collection<Message>(this);

    @Property({columnType: "timestamptz", primary: true})
    created: Date = new Date();

    // [PrimaryKeyType] : [string, string]
}