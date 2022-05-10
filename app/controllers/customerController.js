const UserService = require('../services/user');
const db = require('../models');
const User = db.User;

const createCustomer = (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const customerController = {
  createCustomer,
};

module.exports = customerController;
