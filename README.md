# Shareable Kitchen

This repo will contain everything needed to get shareablekitchen.com up and running. 

I will start off by making the api / orm for the database. Then move over cognito for authentication and create some sort of rds for database storage.

My goal is to use a postgres database for storing user and listing information. Including their stripe information. 


# Requirements
Application requirements are documented elsewhere (Notion / OneNote).

This repo will only worry about technical requirements. For example, what kind of tools are we using and why?

My goal is to have as much of the repo be serverless as needed, but things like the api and orm must be contanerized so that they can be uploaded onto
something like Fargate (which I don't know too much about right now. But ill figure it out.)


API: GraphQL
ORM: TypeORM

Infrastructure: CDK

Auth: Cognito
Database: RDS running postgres



## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template


## Image in my mind



    FRONTEND                        BACKEND
User -> Rect App ->  (API) exposed via  ALB -> Fargate Cluster (Apollo + business logic) -> Database
  |                                                                     |-> Stripe
 \ / 
  .
 Cognito