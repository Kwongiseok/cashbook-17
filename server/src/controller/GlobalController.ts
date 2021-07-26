import { Router } from 'express';
import AuthController from './authController';

const app = Router();
const globalController = () => {
  app.use('/auth', new AuthController().configureRoutes());

  return app;
};

export default globalController;
