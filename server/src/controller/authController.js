import { Router } from 'express';
import AuthService from '../service/authService.js';

const authService = new AuthService();

export default class AuthController {
  constructor() {
    this.router = Router();
  }

  configureRoutes() {
    this.router.get('/github', this.getOAuthGitHub.bind(this));
    this.router.get('/github/callback', this.getOAuthGitHubCb.bind(this));
    return this.router;
  }

  getOAuthGitHub(req, res) {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}`
    );
  }

  getOAuthGitHubCb(req, res) {
    authService.signInGithub(req, res);
  }
}
