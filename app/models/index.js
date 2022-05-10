const Sequelize = require('sequelize');
const databases = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const config = databases[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('../models/User')(sequelize, Sequelize);
db.Department = require('../models/Department')(sequelize, Sequelize);
db.Permissions = require('../models/Permissions')(sequelize, Sequelize);
db.Position = require('../models/Position')(sequelize, Sequelize);
db.Price = require('../models/Price')(sequelize, Sequelize);
db.Addresses = require('../models/Addresses')(sequelize, Sequelize);
db.Role = require('../models/Role')(sequelize, Sequelize);
db.EmployeeProfile = require('../models/EmployeeProfile')(sequelize, Sequelize);
db.WaterInfo = require('../models/WaterInfo')(sequelize, Sequelize);
db.History = require('../models/History')(sequelize, Sequelize);

// TODO: De tam o day
const RolesPermissions = sequelize.define('RolesPermissions', {
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
}, { timestamps: false })
// relationship permission and roles
db.Permissions.belongsToMany(db.Role, {
  through: RolesPermissions,
  // as: 'roles',
  foreignKey: 'permissions_uuid',
  otherKey: 'role_uuid'
});

db.Role.belongsToMany(db.Permissions, {
  through: RolesPermissions,
  // as: 'permissions',
  foreignKey: 'role_uuid',
  otherKey: 'permissions_uuid'
});

// relationship role and user
db.Role.hasMany(db.User);
db.User.belongsTo(db.Role, {
  foreignKey: 'role_uuid'
});

// relationship user and waterInfo
db.User.hasMany(db.WaterInfo, {
  as: 'users',
});
db.WaterInfo.belongsTo(db.User, {
  foreignKey: 'user_uuid'
});

// relationship user and employeeProfile
db.User.hasOne(db.EmployeeProfile)
db.EmployeeProfile.belongsTo(db.User, {
  foreignKey: 'user_uuid',
});

// relationship department and emplyeeProfile
db.Department.hasMany(db.EmployeeProfile, {});
db.EmployeeProfile.belongsTo(db.Department, {
  foreignKey: 'department_uuid'
});

// relationship position and emplyeeProfile
db.Position.hasMany(db.EmployeeProfile);
db.EmployeeProfile.belongsTo(db.Position, {
  foreignKey: 'position_uuid'
});

// relationship user and addresses
db.User.belongsTo(db.Addresses, {
  as: 'Province'
});

db.User.belongsTo(db.Addresses, {
  as: 'Town'
});

db.User.belongsTo(db.Addresses, {
  as: 'Village'
});

db.ROLES = ['superadmin', 'admin', 'moderator', 'user'];

module.exports = db;
