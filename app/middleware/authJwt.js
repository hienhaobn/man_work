const jwt = require('jsonwebtoken');
const db = require('../models');

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(' ')[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        res.status(403).json('Token is not valid');
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json('You are not authenticated');
  }
};

const verifyTokenAndAdminAuth = (req, res, next) => {
  authJwt.verifyToken(req, res, () => {
    console.log(req.user);
    if (req.user.id === req.params.id || req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json('You are not allowed to delete other');
    }
  });
}

const authJwt = {
  verifyToken,
  verifyTokenAndAdminAuth
}

module.exports = authJwt;
