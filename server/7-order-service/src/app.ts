import { config } from '@order/config';
import { databaseConnection } from '@order/database';
import { start } from '@order/server';
import express, { Express } from 'express';

const initilize = (): void => {
  config.cloudinaryConfig();
  databaseConnection();
  const app: Express = express();
  start(app);
};

initilize();