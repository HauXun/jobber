import { verifyGatewayRequest } from '@hauxun/jobber-shared';
import { healthRoutes } from '@order/routes/health';
import { orderRoutes } from '@order/routes/order';
import { Application } from 'express';

const BASE_PATH = '/api/v1/order';

const appRoutes = (app: Application): void => {
  app.use('', healthRoutes());
  app.use(BASE_PATH, verifyGatewayRequest, orderRoutes());
};

export { appRoutes };
