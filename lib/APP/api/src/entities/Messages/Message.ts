/**
 * One Conversation has many messages,
 * Many messages belong to one conversation.
 * A message has a sender.
 * A message has sent time.
 */

import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";
import { Conversation } from "./Conversation";
import { User } from "../User/User";

@Entity()
export class Message {

    @PrimaryKey({nullable: false})
    id: string = v4();

    @ManyToOne(()=> Conversation)
    conversation: Conversation

    @ManyToOne(()=> User)
    author: User

    @Property()
    content: string

    @Property({columnType: "timestamptz"})
    created: Date = new Date();

}