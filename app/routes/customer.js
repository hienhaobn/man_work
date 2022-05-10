const router = require('express').Router();
const { authJwt } = require('../middleware');
const userController = require('../controllers/userController');
const customerController = require('../controllers/customerController');

//  GET ALL
router.get('/', authJwt.verifyToken, userController.getAllUserByRoleType);

// GET ONE
router.get('/:id', authJwt.verifyToken, userController.getUserByRoleType);

// CREATE
router.post('/', authJwt.verifyToken, customerController.createCustomer);

module.exports = router;
