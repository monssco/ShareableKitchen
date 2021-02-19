import * as cdk from '@aws-cdk/core'; 

export class APIStack extends cdk.NestedStack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.NestedStackProps) {
        super(scope, id)

        
        

        // new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'FargateLoadBalanced', {
        //     taskImageOptions: 
        // })

    }
}