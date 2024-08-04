import { config } from '@chat/config';
import { winstonLogger } from '@hauxun/jobber-shared';
import mongoose from 'mongoose';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'chatDatabaseServer', 'debug');

const databaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(`${config.DATABASE_URL}`);
    log.info('Chat service successfully connected to database.');
  } catch (error) {
    log.log('error', 'ChatService databaseConnection() method error:', error);
  }
};

export { databaseConnection };
