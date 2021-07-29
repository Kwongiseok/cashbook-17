import AuthController from './authController.js';
import { Router } from 'express';

const router = Router();
const globalController = () => {
  router.use('/auth', new AuthController().configureRoutes());
  return router;
};

export default globalController;
