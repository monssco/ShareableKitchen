#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CognitoStack } from '../lib/Authentication';
import { RDSStack } from '../lib/Database';
import { S3Stack } from '../lib/ObjectStorage';
import { APIStack } from '../lib/App/index'

const app = new cdk.App();

// const cognito = new CognitoStack(app, 'CognitoStack', {
//     description:'Cognito Stack that handles auth'
// })

// let authRole = cognito.authenticatedRole
// let unAuthRole = cognito.unauthenticatedRole

// const s3 = new S3Stack(app, 'S3Stack', {
//     authenticatedRole: authRole,
//     unauthenticatedRole: unAuthRole
// })

// const rds = new RDSStack(app, 'RDSStack')

let domain = 'shareablekitchen.com'
let subDomain = 'api'

let hostedZoneId= 'Z05002012DN7N9WCCLM98'
let hostedZoneName = 'shareablekitchen.com'

const api = new APIStack(app, 'MyStack', {
    domain,
    subDomain,
    hostedZoneName,
    hostedZoneId


})