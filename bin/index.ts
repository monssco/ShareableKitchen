#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';


import { CognitoStack } from '../lib/Authentication';
import { APIStack } from '../lib/APP/index';
import { CertificateStack } from '../lib/Certificates';

const app = new cdk.App();

console.log("Node env", process.env.DB_HOST);

/**
 * Dev and Pros have different hosted zones.
 * Might be a good idea to also have different sub domains for prod and dev.
 */

const PROD_DOMAIN = 'shareablekitchen.com'
const DEV_DOMAIN = 'dev.shareablekitchen.com'

const PROD_HOSTED_ZONE_ID = 'Z05002012DN7N9WCCLM98'
const DEV_HOSTED_ZONE_ID = 'Z00882051VB7JEP263KOU'

let domain = (process.env.NODE_ENV as string) === 'production' ? PROD_DOMAIN : DEV_DOMAIN

let hostedZoneId= (process.env.NODE_ENV as string) === 'production' ? PROD_HOSTED_ZONE_ID :DEV_HOSTED_ZONE_ID

let hostedZoneName = domain


const certificate = new CertificateStack(app, 'CertificateStack', {
    domain,
    hostedZoneId,
    hostedZoneName
})

/**
 * ex: auth.website.com
 */

// const cognito = new CognitoStack(app, 'CognitoStack', {
//     domain,
//     subDomain: 'auth',
//     authCertificate: certificate.wildCardCertificate,
//     hostedZone: certificate.hostedZone
// })

// const api = new APIStack(app, 'APIStack', {
//     domain,
//     subDomain: 'api',
//     hostedZone: certificate.hostedZone,
//     certificate: certificate.wildCardCertificate,
//     user: {
//         Pool: cognito.userPool!,
//         Client: cognito.userPoolClient!,
//         Domain: cognito.userPoolDomain!
//     }
// })


// let authRole = cognito.authenticatedRole
// let unAuthRole = cognito.unauthenticatedRole

// const s3 = new S3Stack(app, 'S3Stack', {
//     authenticatedRole: authRole,
//     unauthenticatedRole: unAuthRole
// })

// const rds = new RDSStack(app, 'RDSStack')