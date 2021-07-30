import { USER_DB_ERROR } from '../constants/database-error-name.js';
import { DatabaseError } from '../errors/base-errors.js';
import User from '../models/User.js';

class UserRepository {
  async findById(user_id) {
    try {
      const user = await User.findOne({
        attributes: 'user_id',
        where: {
          user_id,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new DatabaseError(USER_DB_ERROR);
    }
  }

  async createUser(user_id) {
    try {
      await User.create({
        user_id,
      });
    } catch (error) {
      console.error(error);
      throw new DatabaseError(USER_DB_ERROR);
    }
  }
}
export const userRepository = new UserRepository();
