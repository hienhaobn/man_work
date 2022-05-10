const userController = require('../controllers/userController');
const { authJwt } = require('../middleware');

const router = require('express').Router();

// GET ALL USERS

router.get('/', authJwt.verifyToken, userController.getAllUsers);

// DELETE USER
// v1/user/123456
router.delete('/:id', authJwt.verifyTokenAndAdminAuth, userController.deleteUser);

// GET PROFILE

router.get('/:id', authJwt.verifyToken, userController.getOneUser);

// UPDATE
router.patch('/:id', authJwt.verifyToken, userController.patchUser);

module.exports = router;
