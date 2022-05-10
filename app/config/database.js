require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4'
    },
    migrationStorageTableName: 'sqlz_migrations',
    seederStorageTableName: 'sqlz_seeders',
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
    logging: false,
    pool: {
      max: 5, // maximum number of connection in pool
      min: 0, // minimum number of connection in pool
      acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000 // maximum time, in milliseconds, that a connection can be idle before being released
    }
  },
  test: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    migrationStorageTableName: 'sqlz_migrations',
    seederStorageTableName: 'sqlz_seeders',
  },
  production: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    migrationStorageTableName: 'sqlz_migrations',
    seederStorageTableName: 'sqlz_seeders',
  },
};
