// 'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tblUser', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(64),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      authorId: {
        type: Sequelize.UUID,
      }
    },
    {
      timestamps: false,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['username'],
        },
      ],
    },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tblUser')
  }
};
