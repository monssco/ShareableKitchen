// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
      connection: {
        host : 'localhost',
        database: 'postgres',
        user:     'test',
        password: 'test'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: __dirname + '/knex/migrations',
      },
      seeds: {
        directory: __dirname + '/knex/seeds'
      }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host : 'localhost',
      database: 'postgres',
      user:     'test',
      password: 'test'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host : process.env.DATABASE_HOST_URL,
      database: process.env.DATABASE_NAME,
      user:     process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  }

};
