import { Model, DataTypes } from '@kwongiseok/woowahan-orm';

export default class User extends Model {
  static init() {
    return super.init({
      user_id: { dataType: DataTypes.STRING, required: true },
    });
  }
}
