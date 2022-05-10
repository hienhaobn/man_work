const db = require('../models');
const Permissions = db.Permissions;
const Op = db.Sequelize.Op;

const getById = (permissionsId) => Permissions.findByPk(permissionsId, {
  include: [
    {
      model: db.Role,
      as: 'roles',
      attributes: ['name', 'code'],
      through: {
        attributes: [],
      }
    }
  ]
});

const getAll = () => Permissions.findAll();

const getOneByField = (fields) => {
  return Permissions.findOne({
    where: {
      [Op.or]: fields
    }
  });
};

const create = (permissions) => {
  return Permissions.create(permissions);
};

const remove = async (id) => {
  const permissions = await getPermissionsById(id);
  if (permissions) {
    await Permissions.destroy();
    return true;
  }
}

const update = async (id, data) => {
  const permissions = await getPermissionsById(id);
  if (permissions) {
    return Permissions.update(data);
  }
}

const PermissionsService = {
  getOneByField,
  getAll,
  getById,
  create,
  remove,
  update,
};

module.exports = PermissionsService;
