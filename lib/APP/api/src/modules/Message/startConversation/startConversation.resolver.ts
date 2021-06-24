import { Listing } from "../../../entities/Listing/Listing";
import { Conversation } from "../../../entities/Messages/Conversation";
import { MyContext } from "../../../types";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { sendMessageEmail } from "../../../utils/Email/sendMessageEmail";
import { Message } from "../../../entities/Messages/Message";

@InputType()
class StartConversationInput {
    
    @Field()
    listingId!: string

    @Field()
    content!: string
}

// TODO: if a convo has already been started, send a new message or send back the id.
@Resolver()
export class StartConversationResolver {

    @Mutation(() => Conversation)
    async startConversation(
        @Arg("input") input: StartConversationInput,
        @Ctx() {em, user}: MyContext): Promise<Conversation> {

            let me = user

            let listing = await em.findOneOrFail(Listing, {id: input.listingId})

            let prevConvo = await em.findOne(Conversation, {buyer: me, listing, seller: listing.author})

            if (prevConvo) {
                let msg = new Message(prevConvo, me, input.content)
                await em.persistAndFlush(msg)
                sendMessageEmail(me, listing.author, listing)
                return prevConvo
            } else {
                let convo = new Conversation(me, listing.author, listing)
                let message = new Message(convo, me, input.content)
                await em.persistAndFlush([convo, message])
                sendMessageEmail(me, listing.author, listing)
                return convo
            }
    }
}