const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WaterInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  WaterInfo.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      price: DataTypes.STRING,
      waterIndex: DataTypes.INTEGER,
      date: DataTypes.DATE,
      status: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate : DataTypes.NOW,
      },
      authorId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'WaterInfo',
      tableName: 'tblWaterInfo',
      underscored: true,
      timestamps: false,
    },
  );
  return WaterInfo;
};

module.exports.StatusValues = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};
