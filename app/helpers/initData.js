
const db = require('../models');

function initial() {
  db.Role.create({
    name: "superadmin",
    code: 0
  });

  db.Role.create({
    name: "moderator",
    code: 1
  });

  db.Role.create({
    name: "admin",
    code: 2
  });

  db.Role.create({
    name: "user",
    code: 3
  });

  db.Permissions.create({
    name: "create"
  });

  db.Permissions.create({
    name: "edit"
  });

  db.Permissions.create({
    name: "delete"
  });

  db.Permissions.create({
    name: "view"
  });
}

module.exports = initial;