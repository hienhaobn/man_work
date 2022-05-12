const db = require('../models');
const Role = db.Role;
const Op = db.Sequelize.Op;

const getRoleById = (roleId) => Role.findByPk(roleId);

const getAll = () => {
  return db.Role.findAll({
    attributes: ['name', 'code'],
    include: [
      {
        model: db.Permissions,
      }
    ]
  });
};

const getOneRoleByField = (fields) => {
  return Role.findOne({
    where: {
      [Op.or]: fields
    }
  });
};

const createRole = ({name, code = 3}) => {

  return Role.create({name, code});
};

const addPermissions = async (roleId, permissionId) => {
  const role = await db.Role.findByPk(roleId);
  const permissions = await db.Permissions.findByPk(permissionId);
  await role.addPermissions(permissions);
  return true;
}


const deleteRole = async (id) => {
  const role = await getRoleById(id);
  if (role) {
    await role.destroy();
    return true;
  }
}

const updateRole = async (id, data) => {
  const role = await getRoleById(id);
  if (role) {
    return role.update(data);
  }
}

const RoleService = {
  getOneRoleByField,
  getAll,
  getRoleById,
  createRole,
  deleteRole,
  updateRole,
  addPermissions,
};

module.exports = RoleService;
