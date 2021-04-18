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
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Message {

    @Field()
    @PrimaryKey({nullable: false})
    id: string = v4();

    @Field(() => Conversation)
    @ManyToOne(()=> Conversation)
    conversation: Conversation

    @Field(() => User)
    @ManyToOne(()=> User)
    author: User

    @Field()
    @Property()
    content: string

    @Field()
    @Property({columnType: "timestamptz"})
    created: Date = new Date();

    constructor(conversation: Conversation, author: User, content: string) {
        this.conversation = conversation
        this.author = author
        this.content = content
    }

}