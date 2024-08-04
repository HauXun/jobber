import { config } from '@gig/config';
import { winstonLogger } from '@hauxun/jobber-shared';
import mongoose from 'mongoose';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'gigDatabaseServer', 'debug');

const databaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(`${config.DATABASE_URL}`);
    log.info('Gig service successfully connected to database.');
  } catch (error) {
    log.log('error', 'GigService databaseConnection() method error:', error);
  }
};

export { databaseConnection };
