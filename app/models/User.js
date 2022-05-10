const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      managerId: DataTypes.UUID,
      manageAddressId: DataTypes.UUID,
      // provinceId: DataTypes.UUID,
      // townId: DataTypes.UUID,
      // villageId: DataTypes.UUID,
      name: DataTypes.STRING,
      dob: DataTypes.DATE,
      sex: DataTypes.STRING,
      avatar: DataTypes.STRING,
      phone: DataTypes.STRING,
      nativePlace: DataTypes.STRING,
      placeOfPermanent: DataTypes.STRING,
      issuedPlace: DataTypes.STRING,
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
      modelName: 'User',
      tableName: 'tblUser',
      underscored: true,
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    },
  );
  return User;
};

module.exports.StatusValues = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};
