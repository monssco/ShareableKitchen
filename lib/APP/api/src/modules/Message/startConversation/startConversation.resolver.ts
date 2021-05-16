import { Listing } from "../../../entities/Listing/Listing";
import { Conversation } from "../../../entities/Messages/Conversation";
import { MyContext } from "../../../types";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { sendMessageEmail } from "../../../utils/Email/sendMessageEmail";

@InputType()
class StartConversationInput {
    
    @Field()
    listingId!: string
}

@Resolver()
export class StartConversationResolver {

    @Mutation(() => Conversation)
    async startConversation(
        @Arg("input", {nullable: false}) input: StartConversationInput,
        @Ctx() {em, user}: MyContext): Promise<Conversation> {

            let me = user

            let listing = await em.findOneOrFail(Listing, {id: input.listingId})

            let convo = new Conversation(me, listing.author, listing)

            await em.persistAndFlush(convo)

            sendMessageEmail(me, listing.author, listing)

            return convo
    }
}