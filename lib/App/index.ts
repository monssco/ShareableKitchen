import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import path = require('path');
import { Duration } from '@aws-cdk/core';

/**
 * Small problem, there is some kind of misconfiguration with the target group and the health check listener
 * This causes issues with the container as it get shut down almost immidietly
 * Don't use their higher level Application Load Balancer, 
 * switch to the FargateService instead
 * Look at this code repo: https://github.com/markusl/cdk-fargate-docker-starter/blob/master/lib/fargate-docker-stack.ts
 *  
 */

export class APIStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id)

            const vpc = new ec2.Vpc(this, "MyVpc", {
                maxAzs: 2, // Default is all AZs in region
                cidr: '10.0.0.0/16',
                subnetConfiguration: [
                    {
                        name: 'public',
                        subnetType: ec2.SubnetType.PUBLIC
                    }
                ]
            });

            const cluster = new ecs.Cluster(this, "APICluster", {
                vpc: vpc
            });

            // const taskDef = new ecs.TaskDefinition(this, 'TaskDefinition', {
            //     compatibility: ecs.Compatibility.EC2,
            //     cpu: '256',
                
            // })

            // new ecs.ContainerDefinition(this, 'ContainerDefinition', {
            //     image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, "server")),
            //     taskDefinition: taskDef,
                
            // })

            

            // Create a load-balanced Fargate service and make it public
            const alb = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "GraphQLAPI", {
                    cluster: cluster, // Required
                    cpu: 256, // Default is 256
                    desiredCount: 1, // Default is 1
                    taskImageOptions: {
                        // This is where you can pass in environment variables to the container.
                        image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, "server")),
                        containerPort: 80,
                        environment: {
                            DB_HOST: 'http://68.145.64.93:5432'
                        }
                    },
                    memoryLimitMiB: 512, // Default is 512
                    publicLoadBalancer: true, // Default is false
                    assignPublicIp: true
            });

            /**
             * Health checks are used by target groups to ensure that the containers haven't crashed etc.
             */
            alb.targetGroup.configureHealthCheck({
                path: '/health-check',
                port: '80',
                healthyHttpCodes: '200,304', // both success and non modified
                enabled: true,
                healthyThresholdCount: 5,
                interval: Duration.seconds(120),
                timeout: Duration.seconds(60)
            })
    }
}