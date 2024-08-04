import { config } from '@gig/config';
import { databaseConnection } from '@gig/database';
import { redisConnect } from '@gig/redis/redis.connection';
import { start } from '@gig/server';
import express, { Express } from 'express';

const initilize = (): void => {
  config.cloudinaryConfig();
  databaseConnection();
  const app: Express = express();
  start(app);
  redisConnect();
};

initilize();