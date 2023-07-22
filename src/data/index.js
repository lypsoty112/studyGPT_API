const config = require("config");
const { join } = require('path');
const knex = require('knex');
const { getLogger } = require('../core/logging');

const DATABASE_CLIENT = config.get('database.client');
const DATABASE_NAME = config.get('database.name');
const DATABASE_HOST = config.get('database.host');
const DATABASE_PORT = config.get('database.port');
const DATABASE_USERNAME = config.get('database.username');
const DATABASE_PASSWORD = config.get('database.password');
const NODE_ENV = config.get('env');
const isDevelopment = NODE_ENV === 'development';

let knexInstance;

async function initializeData() {
  const knexOptions = {
    client: DATABASE_CLIENT,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      insecureAuth: isDevelopment,
    },
    migrations: {
      directory: join(__dirname, 'migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: join(__dirname, 'seeds'),
    },
  };

  // Initialize Knex
  knexInstance = knex(knexOptions);
  const logger = getLogger();

  // Database test
  try {
    await knexInstance.raw('SELECT 1+1 AS result');
  } catch (error) {
    logger.error(error.message, { error });
    throw new Error('Could not initialize the data layer');
  }

  // Migrations
  let migrationsFailed = false;

  try {
    await knexInstance.migrate.latest();
  } catch (error) {
    logger.error('Error while migrating: ' + error.message, { error });
    migrationsFailed = true;
  }

  if (migrationsFailed) {
    try {
      // Rollback migrations if failed
      await knexInstance.migrate.rollback();
    } catch (error) {
      logger.error('Error while rolling back migrations: ' + error.message, { error });
      throw new Error('Could not roll back the migrations');
    }
  }

  // Seeds
  if (isDevelopment) {
    
    try {
      await knexInstance.schema.raw('SET FOREIGN_KEY_CHECKS = 0;');
      await knexInstance.seed.run();
      await knexInstance.schema.raw('SET FOREIGN_KEY_CHECKS = 1;');
    } catch (error) {
      logger.error('Error while seeding: ' + error.message, { error });
      throw new Error('Could not run the seeds');
    }
  }

  logger.info('Successfully connected to the database');
  return knexInstance;
}

// Shutdown
async function shutdown() {
  if (knexInstance) {
    const logger = getLogger();
    logger.info('Attempting to shut down connection to the database');

    await knexInstance.destroy();
    knexInstance = null;

    logger.info('Connection to the database shut down');
  }
}

function getKnex() {
  if (!knexInstance) throw new Error('Please initialize the data layer before getting the Knex instance');
  return knexInstance;
}

const tables = Object.freeze({
  currency: 'currency',
  parameter: 'parameter',
  payment: 'payment',
  status: 'status',
  subscription: 'subscription',
  summary: 'summary',
  user: 'user',
});

module.exports = {
  tables,
  initializeData,
  getKnex,
  shutdown,
};
