import { Router } from 'express';
import { authController } from './authController.js';
import { cashBookController } from './cashBookController.js';
import { chartController } from './chartController.js';

const router = Router();
const globalController = () => {
  router.use('/auth', authController.configureRoutes());
  router.use('/cashbooks', cashBookController.configureRoutes());
  router.use('/chart', chartController.configureRoutes());
  return router;
};

export default globalController;
