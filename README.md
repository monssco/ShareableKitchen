# Base CDK Application Infrastructure

Sample app repo for a full-stack TypeScript application.

I want to develop things locally and push them out fast, while keeping costs down.

## High level image

    FRONTEND                        BACKEND
User -> Rect App ->  (API) exposed via  ALB -> Fargate Cluster (Apollo + business logic) -> Database
  |                                                                     |-> Stripe
 \ / 
  .
 Cognito

## Roadmap

Goal is to get a skeleton running locally and over the cloud so that I can test quickly and then upload the prod version to the cloud.
Get api running locally
Push onto cloud and run it using ECR, Fargate etc etc
Authenticate it using Cognito (Figure out login, lougout, authenticated routes etc, just a basic app nothing crazy)
Figure out how to mock cognito locally, so that local development doesn't get hindered.


## Requirements
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
