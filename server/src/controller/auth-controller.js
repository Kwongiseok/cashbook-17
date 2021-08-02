import { Router } from 'express';
import { githubConfig } from '../config/github.js';
import { authService } from '../service/auth-service.js';
import wrapAsync from '../utils/wrap-async.js';

class AuthController {
  constructor() {
    this.router = Router();
  }

  configureRoutes() {
    this.router.post('/logout', wrapAsync(this.logout.bind(this)));
    this.router.get('/github', this.getOAuthGitHub.bind(this));
    this.router.get('/github/callback', wrapAsync(this.getOAuthGitHubCb.bind(this)));
    return this.router;
  }

  async logout(req, res, next) {
    const session = req.session;
    await authService.logout(session);
    res.status(200).send('logout success');
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
