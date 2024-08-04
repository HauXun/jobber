import { config } from '@auth/config';
import { AuthModel } from '@auth/models/auth.schema';
import { winstonLogger } from '@hauxun/jobber-shared';
import Sequelize from '@sequelize/core';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'authDatabaseServer', 'debug');

export const sequelize: Sequelize = new Sequelize(config.MYSQL_DB!,  {
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    multipleStatements: true
  }
});

sequelize.addModels([AuthModel]);

export async function databaseConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    await sequelize.sync({});
    log.info('AuthService Mysql database connection has been established successfully.');
  } catch (error) {
    log.error('Auth Service - Unable to connect to database.');
    log.log('error', 'AuthService databaseConnection() method error:', error);
  }
}