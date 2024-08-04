import { databaseConnection } from '@review/database';
import { start } from '@review/server';
import express, { Express } from 'express';

const initialize = (): void => {
  const app: Express = express();
  databaseConnection();
  start(app);
};

initialize();
