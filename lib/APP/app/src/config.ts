// const tailwindConfig = require("./tailwind.config.js");

// module.exports = {
//   siteMetadata: {
//     title: `Liveworks`,
//     description: `Liveworks is the best scheduling solution for your hospitality venue.`, // This is what is shown in the google search
//     author: `@monssco`,
//     companyName: `Liveworks`,
//     siteUrl: `https://www.liveworks.app`
//   },
//   plugins: [
//     {
//       resolve: `gatsby-plugin-google-gtag`,
//       options: {
//         // You can add multiple tracking ids and a pageview event will be fired for all of them.
//         trackingIds: [
//           "G-6QEBDBFW0B", // Google Analytics / GA
//         ],
//       },
//     },
//     `gatsby-plugin-robots-txt`,
//     `gatsby-plugin-sitemap`,
//     `gatsby-plugin-react-helmet`,
//     {
//       resolve: `gatsby-source-filesystem`,
//       options: {
//         name: `images`,
//         path: `${__dirname}/src/images`,
//       },
//     },
//     `gatsby-transformer-sharp`,
//     `gatsby-plugin-sharp`,
//     {
//       resolve: `gatsby-plugin-manifest`,
//       options: {
//         name: `Liveworks - Labour marketplace for the hospitality industry`,
//         short_name: `Liveworks`,
//         description: `Website for Liveworks - Labour Marketplace for the hospitality industry.`,
//         lang: `en`,
//         start_url: `/`,
//         background_color: `#663399`,
//         theme_color: `#663399`,
//         display: `minimal-ui`,
//         icon: `src/images/favicon.png`, // This path is relative to the root of the site.
//       },
//     },
//     {
//       resolve: `gatsby-plugin-postcss`,
//       options: {
//         postCssPlugins: [
//           require(`tailwindcss`)(tailwindConfig),
//           require(`autoprefixer`),
//           ...(process.env.NODE_ENV === `production`
//             ? [require(`cssnano`)]
//             : []),
//         ],
//       },
//     },
//     {
//       resolve: 'gatsby-plugin-react-svg',
//       options: {
//         rule: {
//           include: /svg/
//         }
//       }
//     },
//     {
//       resolve: `gatsby-plugin-sass`,
//       options: {
//         postCssPlugins: [require('tailwindcss')('./tailwind.config.js')],
//       },
//     },
//     // this (optional) plugin enables Progressive Web App + Offline functionality
//     // To learn more, visit: https://gatsby.dev/offline
//     // `gatsby-plugin-offline`,
//   ],
// }

export default {
  siteMetadata: {
    title: `Shareable Kitchen`,
    description: `Find a kitchen to rent today!`, // This is what is shown in the google search
    author: `@monssco`,
    companyName: `Shareable Kitchen`,
    siteUrl: `https://www.shareablekitchen.com`
  },
  gMapsKey: 'AIzaSyCJKbuRIZfvDo_zEZOSXlpgNC2RIJc_U-k'
}