import { Message } from "../../entities/Messages/Message";
import { Arg, Ctx, Field, InputType, Query, Resolver } from "type-graphql";
import { PaginationInput } from "../Base/pagination.resolver";
import { MyContext } from "src/types";
import { FindOptions } from "@mikro-orm/core";


@InputType()
class GetMessagesInput extends PaginationInput {
    @Field()
    conversationId: string
}

@Resolver()
export class GetMessagesResolver {

    @Query(() => [Message])
    async getBookings(
        @Arg("input") input: GetMessagesInput,
        @Ctx() {em}: MyContext
    ): Promise<Message[]> {
        const options: FindOptions<Message> = {
            limit: input.limit,
            offset: input.offset,
            orderBy: {
                created: 'asc'
            }
        }
        
        return await em.find(Message, {conversation: {id: input.conversationId}}, options)
    }
}