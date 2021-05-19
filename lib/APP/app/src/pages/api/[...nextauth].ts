import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

// https://next-auth.js.org/getting-started/example
// https://next-auth.js.org/providers/cognito

export default NextAuth({
  // Configure one or more authentication providers
    providers: [
        Providers.Cognito({
            clientId: process.env.COGNITO_CLIENT_ID,
            clientSecret: process.env.COGNITO_CLIENT_SECRET,
            domain: process.env.COGNITO_DOMAIN,
        }),
    ]
})