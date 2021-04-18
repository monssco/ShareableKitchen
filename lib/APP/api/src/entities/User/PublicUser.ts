import { Field, ID, ObjectType } from "type-graphql"
import { User } from "./User"
import { UserImage } from "./UserImage";

@ObjectType("PublicUserType")
export class PublicUser extends User {

    @Field(() => ID)
    id!: string;

    /*
    https://mikro-orm.io/docs/relationships#onetoone
    */
    @Field(()=> UserImage, {nullable: true})
    profile_image?: UserImage;

    @Field({nullable: true})
    first_name?: string;

    @Field({nullable: true})
    last_name?: string;


    // @Field(() => [PublicListing])
    // listings: PublicListing[];

}