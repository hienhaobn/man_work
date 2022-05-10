// 'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tblRoles', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(64),
        unique: true,
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
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tblRoles');
  }
};
