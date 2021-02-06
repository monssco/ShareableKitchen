const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.ts')[environment];
module.exports = require('knex')(config);