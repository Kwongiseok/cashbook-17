import axios from 'axios';
import { userRepository } from '../repository/user-repository.js';

class AuthService {
  async signInGithub(code) {
    let user;
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
    user = await userRepository.findById(id);
    if (!user) {
      userRepository.createUser(id);
    }
    return id;
  }
}

export const authService = new AuthService();
