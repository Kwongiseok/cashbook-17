import { Router } from 'express';
import { authController } from './auth-controller.js';
import { cashBookController } from './cashbook-controller.js';
import { chartController } from './chart-controller.js';

const router = Router();
const globalController = () => {
  router.use('/auth', authController.configureRoutes());
  router.use('/cashbooks', cashBookController.configureRoutes());
  router.use('/chart', chartController.configureRoutes());
  return router;
};

export default globalController;
