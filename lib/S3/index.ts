import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

// TODO: Here is where the ability for users to access buckets should live.
// All required buckets for users to use should be listed here.

export class S3Stack extends cdk.NestedStack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.NestedStackProps) {
        super(scope, id)

        

        const bucket = new s3.Bucket(this, "S3Bucket", {
            versioned: true,
            encryption: s3.BucketEncryption.KMS
        })



    }
}