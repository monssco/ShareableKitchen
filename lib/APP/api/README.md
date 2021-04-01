# Awesome API built with GraphQL Apollo (Express)

Steps to run this project:

1. Run `npm i` command
2. Run `docker-compose up` command
3. Run `npm start` command


# Skeleton

./

`Entities`

This is where we'll declare each seperate entity, in graphql that means a type and in mikroorm that translates to a database table.

`/Base`

This is where abstract classes for each entity are stored. Use these as base for the tables, for creating similar things across different entities, declare them in the base class first.


./

`modules`

Essentially this is where the resolvers for graphQL are made, in the near future it will also have tests for each resolver too.


./

`orm`

Mainly for migrations only. I can't think of anything else to put there.

./

`utils`

Utilities will be here.
