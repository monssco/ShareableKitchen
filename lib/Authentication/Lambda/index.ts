import * as lambda from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core'
import * as path from 'path';

export class CognitoLambda extends cdk.Stack {

    public readonly CustomMessage: lambda.IFunction;
    public readonly PostConfirmation: lambda.IFunction;
    public readonly PreSignUp: lambda.IFunction;
    public readonly PopulateUsers: lambda.IFunction;


    constructor(scope: cdk.Construct, id: string, props?: cdk.Stack) {
        super(scope, id)


        const preSignUp = new lambda.Function(this, 'PreSignUp', {
            code: lambda.Code.fromAsset(path.join(__dirname, 'PreSignUp')),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_12_X,
            description: 'PreSignUp Lambda for Cognito',
        });

        this.PreSignUp = preSignUp;

        const customMessage = new lambda.Function(this, 'CustomMessage', {
            code: lambda.Code.fromAsset(path.join(__dirname, 'CustomMessage')),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_12_X,
            description: 'Custom Message Lambda for Cognito',
        });

        this.CustomMessage = customMessage;


        const postConfirmation = new lambda.Function(this, 'PostConfirmation', {
            code: lambda.Code.fromAsset(path.join(__dirname, 'PostConfirmation')),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_12_X,
            description: 'Post Confirmation Lambda for Cognito',
        });

        this.PostConfirmation = postConfirmation;

        // Is this really needed? I think in the post confirmation lambda we can put that event in some kind of sqs queue, this might not be necessary.
        // This was used in the original stack to put users into ES.
        const populateUsers = new lambda.Function(this, 'PopulateUsers', {
            code: lambda.Code.fromAsset(path.join(__dirname, 'PopulateUsers')),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_12_X,
            description: 'Populate User Lambda for Cognito',
        });

        this.PopulateUsers = populateUsers;
    }
}