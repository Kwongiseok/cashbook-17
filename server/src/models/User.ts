import { Model, DataTypes } from 'woowahan-orm';

class User extends Model {
  static init() {
    return super.init({
      user_id: { dataType: DataTypes.STRING, required: true },
    });
  }
}
export default User;
