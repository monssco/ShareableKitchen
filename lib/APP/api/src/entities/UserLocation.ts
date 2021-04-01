import { Entity, OneToOne } from "@mikro-orm/core";
import { ObjectType } from "type-graphql";
import { User } from "./User";
import {Location} from './Base/Location'

@ObjectType({implements: Location})
@Entity()
export class UserLocation extends Location {

    // One user can only have one Location
    @OneToOne(() => User, (user) => user.location)
    user!: User;

}