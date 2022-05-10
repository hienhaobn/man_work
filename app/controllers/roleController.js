const RoleService = require('../services/role');

const getOne = async (req, res, next) => {
  try {
    const roleId = req.params.id;
    console.log(roleId)
    const role = await RoleService.getRoleById(roleId);
    if (!role) {
      console.log('Role not found!');
      return null;
    }
    return res.status(200).json(role);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const roles = await RoleService.getAll();
    if (roles) {
      return res.status(200).json(roles);
    }
    return res.status(200).json({});
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, code } = req.body;
    const role = await RoleService.createRole({ name, code});
    if (!role) {
      console.log('Role not found!');
      return null;
    }
    return res.status(200).json(role);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const roleId = req.params.id;
    const role = await RoleService.deleteRole(roleId);
    if (role) {
      return res.status(200).json(role);
    }
    return res.status(200).json({});
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const update = async (req, res, next) => {
  try {
    const roleId = req.params.id;
    const { name, code } = req.body;
    const role = await RoleService.updateRole(roleId, {name, code});
    if (role) {
      return res.status(200).json(role);
    }
    return res.status(200).json({});
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const addPermissions = async (req, res, next) => {
  try {
    const { roleId, permissionId } = req.body;
    const result = await RoleService.addPermissions(roleId, permissionId);
    if (!result) {
      return res.status(404).json({})
    }
    return res.status(200).json({message: result});
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

const RoleController = {
  getOne,
  getAll,
  create,
  deleteRole,
  update,
  addPermissions,
}

module.exports = RoleController;
