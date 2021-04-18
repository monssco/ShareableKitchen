import { Conversation } from "../../entities/Messages/Conversation";
import { MyContext } from "../../types";
import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Message } from "../../entities/Messages/Message";


@Resolver(() => Conversation)
export class GetConversationsResolver {
    
    @Query(() => [Conversation])
    async getConversations(
        @Ctx() {em, user}: MyContext): Promise<Conversation[]> {

        return await em.find(Conversation, {$or: [{buyer: {id: user?.sub}}, {seller: {id: user?.sub}}]})
    }

    @FieldResolver()
    async messages(
        @Root() conversation: Conversation,
        @Ctx() {em}: MyContext
    ): Promise<Message[]> {
        return await em.find(Message, {conversation})
        
    }
}