import { config } from '@chat/config';
import { databaseConnection } from '@chat/database';
import { start } from '@chat/server';
import express, { Express } from 'express';

const initilize = (): void => {
  config.cloudinaryConfig();
  databaseConnection();
  const app: Express = express();
  start(app);
};

initilize();