const UserService = require('../services/user');
const db = require('../models');
const User = db.User;

const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    // res.status(200).json(UserDTO.getAllUser(users));
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getAllUserByRoleType = async (req, res) => {
  try {
    const type = req.params.type;
    const user = await UserService.getAllUsersByRoleType(type);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

const getOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
}

const getUserByRoleType = async (req, res) => {
  try {
    const type = req.params.type;
    const user = await UserService.getUserByRoleType(type);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
};

const patchUser = async (req, res) => {
  const userId = req.params.id;
  const userData = { ...req.body, uuid: userId };
  const user = await UserService.updateUser(userData);
  return res.status(200).json(user)
};

const userController = {
  getAllUsers,
  getAllUserByRoleType,
  getUserByRoleType,
  deleteUser,
  getOneUser,
  patchUser,
};

module.exports = userController;