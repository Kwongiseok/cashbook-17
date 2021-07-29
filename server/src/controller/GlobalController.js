import AuthController from './authController.js';
import { Router } from 'express';

const app = Router();
const globalController = () => {
  app.use('/auth', new AuthController().configureRoutes());
  return app;
};

export default globalController;
