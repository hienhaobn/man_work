const router = require('express').Router();
const AuthController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authJwt');

// REGISTER
router.post('/register', AuthController.register);

// LOGIN
router.post('/login', AuthController.login);

// REFRESH
router.post('/refresh', AuthController.requestRefreshToken);

// LOGOUT
router.post('/logout', verifyToken, AuthController.logout);

module.exports = router;