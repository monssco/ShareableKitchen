import { Conversation } from "../../../entities/Messages/Conversation";
import { MyContext } from "../../../types";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Message } from "../../../entities/Messages/Message";
import { sendMessageEmail } from "../../../utils/Email/sendMessageEmail";

@InputType()
class SendMessageInput {
    @Field()
    content!: string

    @Field()
    conversationId!: string
}

@Resolver()
export class SendMessageResolver {

    @Mutation(()=> Message)
    async sendMessage(
        @Arg("input", {nullable: false}) input: SendMessageInput,
        @Ctx() {em, user}: MyContext): Promise<Message> {

            let me = user

            let conversation = await em.findOneOrFail(Conversation, {id: input.conversationId})

            const message = new Message(conversation, me, input.content)

            await em.persistAndFlush(message)
            let recipient = me.id === conversation.buyer.id ? conversation.listing.author : conversation.buyer

            sendMessageEmail(me, recipient, conversation.listing);
            return message
    }
}