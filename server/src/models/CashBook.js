import { Model, DataTypes } from '@kwongiseok/woowahan-orm';

export default class CashBook extends Model {
  static init() {
    return super.init({
      category: { dataType: DataTypes.STRING, required: true },
      category_type: { dataType: DataTypes.STRING, required: true },
      memo: { dataType: DataTypes.STRING, required: true },
      payment: { dataType: DataTypes.STRING, required: true },
      price: { dataType: DataTypes.INTEGER, required: true },
      date: { dataType: DataTypes.DATE, required: true },
      user_id: { dataType: DataTypes.STRING, required: true },
    });
  }
}
