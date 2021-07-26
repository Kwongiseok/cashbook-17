import { Router, Request, Response } from 'express';
import AuthService from '../service/authService';

const authService = new AuthService();

export default class AuthController {
  router: Router;

  constructor() {
    this.router = Router();
  }

  configureRoutes() {
    this.router.get('/', this.post);
    return this.router;
  }

  post(req: Request, res: Response, next: any) {
    res.status(200).json('asdasda');
  }
}
