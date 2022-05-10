const PermissionService = require('../services/permission');

const getOne = async (req, res, next) => {
  try {
    const permissionId = req.params.id;
    const permission = await PermissionService.getById(permissionId);
    if (permission
        && Object.keys(permission).length === 0
        && Object.getPrototypeOf(permission) === Object.prototype) {
      console.log('No data');
      return res.status(201).json({});
    }
    return res.status(200).json(permission);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const permissions = await PermissionService.getAll();
    if (permissions.length === 0) {
      console.log('No data');
      return res.status(201).json([]);
    }
    return res.status(200).json(permissions);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, code } = req.body;
    const permission = await PermissionService.create({ name, code});
    if (!permission) {
      console.log('Cannot create permission');
      return res.status(404).json({message: 'cannot create permission'});
    }
    return res.status(200).json(permission);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const permissionId = req.params.id;
    const permission = PermissionService.remove(permissionId);
    if (!permission) {
      console.log('Cannot remove permission');
      return res.status(404).json({message: 'cannot remove permission'});
    }
    return res.status(200).json(permission);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const update = async (req, res, next) => {
  try {
    const permissionId = req.params.id;
    const { name } = req.body;
    const permission = PermissionService.update(permissionId, {name});
    if (!permission) {
      console.log('Cannot update permission');
      return res.status(404).json({message: 'cannot update permission'});
    }
    return res.status(200).json(permission);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const PermissionController = {
  getOne,
  getAll,
  create,
  remove,
  update,
}

module.exports = PermissionController;
