const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      tableName: DataTypes.STRING,
      tableId: DataTypes.STRING,
      oldData: DataTypes.STRING,
      newData: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      authorId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'History',
      tableName: 'tblHistory',
      underscored: true,
      timestamps: false,
    },
  );
  return History;
};
