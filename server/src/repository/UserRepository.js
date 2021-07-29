import User from '../models/User.js';

class UserRepository {
  async findById(id) {
    const user = await User.findOne({
      attributes: 'user_id',
      where: {
        user_id: id,
      },
    });
    return user;
  }

  async createUser(id) {
    await User.create({
      user_id: id,
    });
  }
}
export const userRepository = new UserRepository();
