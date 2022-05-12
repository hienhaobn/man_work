const db = require('../models');
const ROLES = db.ROLES;

const checkDuplicateUsername = (req, res, next) => {
  const { username } = req.body;
  db.User.findOne({
    where: {
      username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({ message: 'Failed! Username is already in use!'});
      return;
    }
    next();
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (ROLES.includes(req.body.roles[i])) {
        res.status(400).send({ message: 'Falied! Role does not exist = ' + req.body.roles[i]});
        return;
      }
    }
  }
  next();
}

const verifySignUp = {
  checkDuplicateUsername,
  checkRolesExisted
}

module.exports = verifySignUp;
