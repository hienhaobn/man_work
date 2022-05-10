const db = require('../models');
const Op = db.Sequelize.Op;

const { convertRoleNameToRoleType } = require('../helpers/role');

const getUserById = (userId) => {
  return db.User.findByPk(userId);
};

const getOneUserByFields = (fields) => {
  return db.User.findOne({
    where: {
      [Op.or]: fields
    },
    include: {
      model: db.Role
    }
  });
};

const getAllUsers = () => {
  return db.User.findAll({
    attributes: ['uuid', 'managerId', 'manageAddressId', 'name', 'dob', 'sex', 'avatar', 'phone', 'nativePlace', 'placeOfPermanent', 'issuedPlace', 'status', 'ProvinceUuid', 'TownUuid', 'VillageUuid'],
    include: [
      {
        model: db.EmployeeProfile,
        attributes: ['username', 'salary'],
        include: [
          {
            model: db.Department,
            attributes: ['name'],
          },
          {
            model: db.Position,
            attributes: ['name'],
            all: true,
          },
        ],
      }
    ],
    raw: true,
    nest: true,
  });
};

const getAllUsersByRoleType = (roleName) => {
  const type = convertRoleNameToRoleType(roleName);
  return db.User.findAll({
    include: [
      {
        model: db.Role,
        where: {
          code: {
            [Op.eq]: type
          }
        }
      }
    ]
  })
};


const getUserByRoleType = (roleName) => {
  const type = convertRoleNameToRoleType(roleName);
  return db.User.findOne({
    include: [
      {
        model: db.Role,
        where: {
          code: {
            [Op.eq]: type
          }
        }
      }
    ]
  })
};

const updateUser = (user) => {
  return db.User.findByPk(user.uuid).then(u => {
    if (u) {
      u.update(user).then(a => {
        return a;
      }).catch(err => console.log(err));
    }
  })
  .catch(err => {
    console.log(err);
  });
}

const UserService = {
  getUserById,
  getOneUserByFields,
  getAllUsers,
  getAllUsersByRoleType,
  getUserByRoleType,
  updateUser,
};

module.exports = UserService;
