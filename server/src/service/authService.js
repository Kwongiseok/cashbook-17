import axios from 'axios';
import { userRepository } from '../repository/UserRepository.js';

export default class AuthService {
  async signInGithub(req, res) {
    const { code } = req.query;
    const TOKEN_URL = `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`;
    const { data } = await axios.post(TOKEN_URL);
    const searchParams = new URLSearchParams(data);
    const accessToken = searchParams.get('access_token');
    const USER_PROFILE_URL = 'https://api.github.com/user';
    const {
      data: { id },
    } = await axios.get(USER_PROFILE_URL, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    const user = await userRepository.findById(id);
    if (!user) userRepository.createUser(id);
    req.session.user = user;
    res.redirect('/');
  }
}
