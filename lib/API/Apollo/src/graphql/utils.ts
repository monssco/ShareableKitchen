import {buildSchema} from 'type-graphql'
import {MeResolver} from './modules/User/Me';


// When you add a new resolver, come here and add it to this array, so that it can be exposed in the schema

export const createSchema = () =>


buildSchema({
    resolvers: [
        MeResolver
    ]
})