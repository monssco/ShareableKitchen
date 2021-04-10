/**
 * One Conversation has many messages,
 * Many messages belong to one conversation.
 * A message has a sender.
 * A message has sent time.
 */

import { Entity, PrimaryKey } from "@mikro-orm/core";
// import { Entity, ManyToOne, OneToOne, PrimaryKeyType, Property } from "@mikro-orm/core";
// import { User } from "../User/User";
// import { Conversation } from "./Conversation";

@Entity()
export class Message {

    // @OneToOne(()=> User, user => user.message, {primary: true})
    // author: User

    // @ManyToOne(()=> Conversation, {primary: true})
    // conversation: Conversation

    @PrimaryKey({nullable: false})
    content: string

    // @Property({columnType: "timestamptz"})
    // created: Date = new Date();

    // [PrimaryKeyType] : [string, string]
}