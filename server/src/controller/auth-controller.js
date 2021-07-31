import { Router } from 'express';
import { githubConfig } from '../config/github.js';
import { authService } from '../service/auth-service.js';
import wrapAsync from '../utils/wrap-async.js';

class AuthController {
  constructor() {
    this.router = Router();
  }

  configureRoutes() {
    this.router.get('/github', wrapAsync(this.getOAuthGitHub.bind(this)));
    this.router.get('/github/callback', wrapAsync(this.getOAuthGitHubCb.bind(this)));
    return this.router;
  }

  getOAuthGitHub(req, res, next) {
    res.redirect(githubConfig.signURL);
  }

  async getOAuthGitHubCb(req, res, next) {
    const { code } = req.query;
    const id = await authService.signInGithub(code);
    req.session.user = `${id}`;
    res.redirect('/');
  }
}
export const authController = new AuthController();
