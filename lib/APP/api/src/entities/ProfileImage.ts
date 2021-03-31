import { Entity, OneToOne } from "@mikro-orm/core";
import { ObjectType } from "type-graphql";
import { Image } from "./Image";
import { User } from "./User";

@ObjectType()
@Entity()
export class ProfileImage extends Image {

    // One user can only have one profile image
    @OneToOne(() => User, (user) => user.profile_image)
    user!: User;

}