import * as cdk from '@aws-cdk/core'
import * as rds from '@aws-cdk/aws-rds';


export class RDS extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id)

        // new rds.DatabaseCluster(this, "RDSCluster", {
        //     engine: rds.DatabaseClusterEngine.AURORA_POSTGRESQL,
        //     instanceProps: {
        //         instanceType: ec2
        //     }
        // })
    }
}