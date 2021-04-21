import { Field, InputType, Int } from "type-graphql";

/**
 * If you implement pagination, they fields should not be empty.
 */
@InputType()
export class PaginationInput {

    /**
     * By default, pull 10.
     */
    @Field(() => Int)
    limit: number = 10;

    /**
     * Default offset is 0.
     */
    @Field(() => Int)
    offset: number = 0;
}