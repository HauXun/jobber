import { winstonLogger } from '@hauxun/jobber-shared';
import { config } from '@order/config';
import mongoose from 'mongoose';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'orderDatabaseServer', 'debug');

const databaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(`${config.DATABASE_URL}`);
    log.info('Order service successfully connected to database.');
  } catch (error) {
    log.log('error', 'OrderService databaseConnection() method error:', error);
  }
};

export { databaseConnection };
