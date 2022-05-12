const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
    Task.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      source: DataTypes.UUID,
      name: DataTypes.STRING,
      descriptions: DataTypes.TEXT,
      note: DataTypes.TEXT,
      type: DataTypes.STRING,
      level: DataTypes.INTEGER,
      file: DataTypes.STRING,
      document: DataTypes.STRING,
      authorId: DataTypes.STRING,
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
      modelName: 'Task',
      tableName: 'Task',
      underscored: true,
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    },
  );
  return Task;
};
