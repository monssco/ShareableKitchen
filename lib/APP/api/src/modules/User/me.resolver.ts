import { User } from '../../entities/User';
import { MyContext } from 'src/types';
import {Ctx, Query, Resolver} from 'type-graphql';

/*
Problem: So when you attach listings to a user, and that user's information is made public, how should it be handled? We can't return a user type, it will also expose the stripe ids and more stuff, need a way to only expose stuff that can be exposed, nothing sensitive.
*/

@Resolver()
export class MeResolver {

    @Query(() => User, {nullable: true})
    async me(
        @Ctx() {em, user}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id: user?.sub})
        return me;
    }
}
