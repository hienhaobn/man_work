const db = require('../models');
const User = db.User;
const EmployeeProfile = db.EmployeeProfile;
const Op = db.Sequelize.Op;

// DATABASE
const getEmployeeProfileById = (ePId) => {
  return EmployeeProfile.findByPk(ePId);
};

const getOneEmployeeProfileByFields = (fields, attributes) => {
  return EmployeeProfile.findOne({
    attributes: attributes,
    where: {
      [Op.or]: fields
    },
    include: {
      model: User
    }
  });
};

const getAllUsersByFields = (fields) => {
  return EmployeeProfile.findAll({
    // attributes: ['uuid', 'username'],
    include: [
      {
        model: User,
        include: [
          {
            model: db.Role,
          },
          {
            model: db.Addresses,
            as: 'Town'
          },
          {
            model: db.Addresses,
            as: 'Province'
          },
          {
            model: db.Addresses,
            as: 'Village'
          }
        ],
        required: true,
      },
      {
        model: db.Department
      },
      {
        model: db.Position
      }
    ]
  });
};

const EmployeeProfileService = {
  getEmployeeProfileById,
  getOneEmployeeProfileByFields,
  getAllUsersByFields
};

module.exports = EmployeeProfileService;
