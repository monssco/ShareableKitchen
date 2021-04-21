import { Conversation } from "../../entities/Messages/Conversation";
import { MyContext } from "../../types";
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Message } from "../../entities/Messages/Message";
import { PaginationInput } from "../Base/pagination.resolver";
import { FindOptions } from "@mikro-orm/core";


@Resolver(() => Conversation)
export class GetConversationsResolver {
    
    @Query(() => [Conversation])
    async getConversations(
        @Arg("input") input: PaginationInput,
        @Ctx() {em, user}: MyContext): Promise<Conversation[]> {

            const options: FindOptions<Conversation> = {
                limit: input.limit,
                offset: input.offset,
                orderBy: {
                    created: 'asc'
                }
            }

            return await em.find(Conversation, {$or: [{buyer: {id: user?.sub}}, {seller: {id: user?.sub}}]}, options)
    }

    @FieldResolver()
    async messages(
        @Root() conversation: Conversation,
        @Ctx() {em}: MyContext
    ): Promise<Message[]> {
        return await em.find(Message, {conversation})
        
    }
}