import { Model, DataTypes } from '@kwongiseok/woowahan-orm';

export default class Payment extends Model {
  static init() {
    return super.init({
      user_id: { dataType: DataTypes.STRING, required: true },
      name: { dataType: DataTypes.STRING, required: true },
    });
  }
}
