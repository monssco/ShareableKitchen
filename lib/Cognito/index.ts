import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import * as iam from '@aws-cdk/aws-iam'

import {CognitoLambda} from './Lambda/index'

// TODO: User env variables
const USER_POOL_NAME = `USER_POOL`

export class CognitoStack extends cdk.Stack {

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Nested stack that creates all the lambda functions.
        const lambdas = new CognitoLambda(this, 'CognitoLambdaStack')

        // The code that defines your stack goes here
        let userPool = new cognito.UserPool(this, USER_POOL_NAME, {
            userPoolName: USER_POOL_NAME,
            standardAttributes: {
                email: {
                    required: true,
                    mutable: true
                },
                givenName: {
                    required: true,
                    mutable: true
                },
                familyName: {
                    required: true,
                    mutable: true
                }
            },
            passwordPolicy: {
                minLength: 8,
                requireLowercase: true,
                requireDigits: true,
                requireSymbols: false,
                requireUppercase: true
            },
            enableSmsRole: true,
            lambdaTriggers: {
                customMessage:lambdas.CustomMessage,
                preSignUp: lambdas.PreSignUp,
                postConfirmation: lambdas.PostConfirmation
            }
            
            
            
        });

        let userPoolClient = new cognito.UserPoolClient(this, 'UserPoolClient', {
            userPool,
            userPoolClientName: 'MyUserPoolClient'
        })

    //     let identityPool = new cognito.CfnIdentityPool(this, 'IdentityPool', {
    //         allowUnauthenticatedIdentities: false,
    //         cognitoIdentityProviders: [
    //             {
    //                 clientId: userPoolClient.userPoolClientId,
    //                 providerName: userPoolClient.userPoolClientName,
    //                 serverSideTokenCheck: true
    //             }
    //         ]
    //     })

    //     const unauthenticatedRole = new iam.Role(this, 'CognitoDefaultUnauthenticatedRole', {
    //         assumedBy: new iam.FederatedPrincipal('cognito-identity.amazonaws.com', {
    //             "StringEquals": { "cognito-identity.amazonaws.com:aud": identityPool.ref },
    //             "ForAnyValue:StringLike": { "cognito-identity.amazonaws.com:amr": "unauthenticated" },
    //         }, "sts:AssumeRoleWithWebIdentity"),
    //     });

    //     unauthenticatedRole.addToPolicy(new iam.PolicyStatement({
    //         effect: iam.Effect.ALLOW,
    //         actions: [
    //             "mobileanalytics:PutEvents",
    //             "cognito-sync:*"
    //         ],
    //         resources: ["*"],
    //     }));


    //     const authenticatedRole = new iam.Role(this, 'CognitoDefaultAuthenticatedRole', {
    //         assumedBy: new iam.FederatedPrincipal('cognito-identity.amazonaws.com', {
    //             "StringEquals": { "cognito-identity.amazonaws.com:aud": identityPool.ref },
    //             "ForAnyValue:StringLike": { "cognito-identity.amazonaws.com:amr": "authenticated" },
    //         }, "sts:AssumeRoleWithWebIdentity"),
    //     });

    //     authenticatedRole.addToPolicy(new iam.PolicyStatement({
    //         effect: iam.Effect.ALLOW,
    //         actions: [
    //             "mobileanalytics:PutEvents",
    //             "cognito-sync:*",
    //             "cognito-identity:*"
    //         ],
    //         resources: ["*"],
    //     }));

    //     const defaultPolicy = new cognito.CfnIdentityPoolRoleAttachment(this, 'DefaultValid', {
    //         identityPoolId: identityPool.ref,
    //         roles: {
    //             'unauthenticated': unauthenticatedRole.roleArn,
    //             'authenticated': authenticatedRole.roleArn
    //         }
    //     });
        
    }
}