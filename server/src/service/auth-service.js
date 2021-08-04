import axios from 'axios';
import { githubConfig } from '../config/github.js';
import { INVALID_ACCESS } from '../constants/client-error-name.js';
import { BadRequestError } from '../errors/client-errors.js';
import { userRepository } from '../repository/user-repository.js';

class AuthService {
  async signInGithub(code) {
    let user;
    const TOKEN_URL = `${githubConfig.tokenURL}&code=${code}`;
    const { data } = await axios.post(TOKEN_URL);
    const searchParams = new URLSearchParams(data);
    const accessToken = searchParams.get('access_token');
    const {
      data: { id },
    } = await axios.get(githubConfig.profileURL, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    user = await userRepository.findById(id);
    if (!user) {
      userRepository.createUser(`${id}`);
    }
    return id;
  }

  async logout(session) {
    if (session) {
      const user_id = session.user;
      if (user_id) {
        const user = await userRepository.findById(user_id);
        if (!user) {
          throw new BadRequestError(INVALID_ACCESS);
        }
        user && session.destroy();
      } else {
        throw new BadRequestError(INVALID_ACCESS);
      }
    } else {
      throw new BadRequestError(INVALID_ACCESS);
    }
  }
}

export const authService = new AuthService();
