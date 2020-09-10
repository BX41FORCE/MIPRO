// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'MiproData',
      user: 'postgres',
      password: '12345'
    }
  }
  /*
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },
  
  staging: {
    client: 'postgresql',
    connection: {
      database: 'MiproData',
      user: 'postgres',
      password: '12345'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  
  production: {
    client: 'postgresql',
    connection: {
      database: 'MiproData',
      user: 'postgres',
      password: '12345'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }*/
}