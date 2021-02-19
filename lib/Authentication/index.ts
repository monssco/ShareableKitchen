import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import * as iam from '@aws-cdk/aws-iam'

import {CognitoLambda} from './Lambda/index'

// Most of stack copied from: https://stackoverflow.com/questions/55784746/how-to-create-cognito-identitypool-with-cognito-userpool-as-one-of-the-authentic

// No 
const USER_POOL_NAME = `USER_POOL`

export class CognitoStack extends cdk.Stack {

    // These roles will be used across the app for accessing various resources.
    public readonly unauthenticatedRole: iam.Role
    public readonly authenticatedRole: iam.Role

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
                    mutable: false
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
            },
            signInAliases: {
                email: true,
                phone: true,
                username: false,
                preferredUsername: false,
            },
            accountRecovery: cognito.AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA,
            signInCaseSensitive: true,
            selfSignUpEnabled: true,
            
            // userVerification: {                              
                
            // }
            // emailSettings: {
            //     from: 'info@monss.co',
            //     replyTo: 'info@monss.co'
            // }
        });

        const cfnUserPool = userPool.node.defaultChild as cognito.CfnUserPool;
        cfnUserPool.policies = {
            passwordPolicy: {
                minimumLength: 8,
                requireLowercase: false,
                requireNumbers: false,
                requireUppercase: false,
                requireSymbols: false
            }
        };
        const userPoolClient = new cognito.UserPoolClient(this, 'MyUserPoolClient', {
            generateSecret: false,
            userPool: userPool,
            userPoolClientName: 'MyUserPoolClientName'
        });
        const identityPool = new cognito.CfnIdentityPool(this, 'MyCognitoIdentityPool', {
            allowUnauthenticatedIdentities: false,
            cognitoIdentityProviders: [{
                clientId: userPoolClient.userPoolClientId,
                providerName: userPool.userPoolProviderName,
            }]
        });

        this.unauthenticatedRole = new iam.Role(this, 'CognitoDefaultUnauthenticatedRole', {
            assumedBy: new iam.FederatedPrincipal('cognito-identity.amazonaws.com', {
                "StringEquals": { "cognito-identity.amazonaws.com:aud": identityPool.ref },
                "ForAnyValue:StringLike": { "cognito-identity.amazonaws.com:amr": "unauthenticated" },
            }, "sts:AssumeRoleWithWebIdentity"),
        });
        
        this.unauthenticatedRole.addToPolicy(new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: [
                "mobileanalytics:PutEvents",
                "cognito-sync:*"
            ],
            resources: ["*"],
        }));


        this.authenticatedRole = new iam.Role(this, 'CognitoDefaultAuthenticatedRole', {
            assumedBy: new iam.FederatedPrincipal('cognito-identity.amazonaws.com', {
                "StringEquals": { "cognito-identity.amazonaws.com:aud": identityPool.ref },
                "ForAnyValue:StringLike": { "cognito-identity.amazonaws.com:amr": "authenticated" },
            }, "sts:AssumeRoleWithWebIdentity"),
        });

        this.authenticatedRole.addToPolicy(new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: [
                "mobileanalytics:PutEvents",
                "cognito-sync:*",
                "cognito-identity:*"
            ],
            resources: ["*"],
        }));


        const defaultPolicy = new cognito.CfnIdentityPoolRoleAttachment(this, 'DefaultValid', {
            identityPoolId: identityPool.ref,
            roles: {
                'unauthenticated': this.unauthenticatedRole.roleArn,
                'authenticated': this.authenticatedRole.roleArn
            }
        });

        
        
    }
}