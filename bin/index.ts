#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CognitoStack } from '../lib/Cognito';

const app = new cdk.App();

new CognitoStack(app, 'CognitoStack', {
    description:'Cognito Stack that handles auth'
})