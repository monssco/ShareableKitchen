#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CognitoStack } from '../lib/Authentication';
import { RDSStack } from '../lib/Database';
import { S3Stack } from '../lib/ObjectStorage';

const app = new cdk.App();

const cognito = new CognitoStack(app, 'CognitoStack', {
    description:'Cognito Stack that handles auth'
})

let authRole = cognito.authenticatedRole
let unAuthRole = cognito.unauthenticatedRole

const s3 = new S3Stack(app, 'S3Stack', {
    authenticatedRole: authRole,
    unauthenticatedRole: unAuthRole
})

const rds = new RDSStack(app, 'RDSStack')