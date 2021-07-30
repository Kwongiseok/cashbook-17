import { Router } from 'express';
import { authService } from '../service/authService.js';

class AuthController {
  constructor() {
    this.router = Router();
  }

  configureRoutes() {
    this.router.get('/github', this.getOAuthGitHub.bind(this));
    this.router.get('/github/callback', this.getOAuthGitHubCb.bind(this));
    return this.router;
  }

  getOAuthGitHub(req, res, next) {
    try {
      res.redirect(process.env.GITHUB_SIGN_URL);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async getOAuthGitHubCb(req, res, next) {
    try {
      const { code } = req.query;
      const id = await authService.signInGithub(code);
      req.session.user = id;
      res.redirect('/');
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
export const authController = new AuthController();
