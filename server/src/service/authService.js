import axios from 'axios';
import { userRepository } from '../repository/UserRepository.js';

export default class AuthService {
  async signInGithub(req, res) {
    const { code } = req.query;
    const TOKEN_URL = `${process.env.GITHUB_TOKEN_URL}&code=${code}`;
    const { data } = await axios.post(TOKEN_URL);
    const searchParams = new URLSearchParams(data);
    const accessToken = searchParams.get('access_token');
    const {
      data: { id },
    } = await axios.get(process.env.GITHUB_PROFILE_URL, {
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
