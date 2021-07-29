import { Router } from 'express';
import AuthService from '../service/authService.js';

const authService = new AuthService();

export default class AuthController {
  constructor() {
    this.router = Router();
  }

  configureRoutes() {
    this.router.get('/', this.post);
    return this.router;
  }

  post(req, res, next) {
    res.status(200).json('asdasda');
  }
}
