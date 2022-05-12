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
db.Role = require('../models/Role')(sequelize, Sequelize);
db.User = require('../models/User')(sequelize, Sequelize);
db.Task = require('../models/Task')(sequelize, Sequelize);
db.Project = require('../models/Project')(sequelize, Sequelize);
// db.RolesPermissions = require('../models/RolesPermissions')(sequelize, Sequelize);
// db.UserTask = require('../models/UserTask')(sequelize, Sequelize);
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
}, { timestamps: false });

const UserProject = sequelize.define('UserProject', {
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
}, { timestamps: false });

const UserTask = sequelize.define('UserTask', {
  responsibility: Sequelize.STRING,
  dateFrom: Sequelize.DATE,
  dateTo: Sequelize.DATE,
  taskmasterId: Sequelize.STRING, // Nguoi phan cong
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
}, { timestamps: false });

/////////////////////////////////////////
// relationship permission and roles
db.Permissions.belongsToMany(db.Role, {
  through: RolesPermissions,
  // as: 'roles',
  foreignKey: 'permissions_uuid',
  otherKey: 'role_uuid'
});

db.Role.belongsToMany(db.Permissions, {
  through: RolesPermissions,
  foreignKey: 'role_uuid',
  otherKey: 'permissions_uuid'
});

// relationship role and user
db.Role.hasMany(db.User);
db.User.belongsTo(db.Role, {
  foreignKey: 'role_uuid'
});

db.Position.hasMany(db.User);
db.User.belongsTo(db.Position, {
  foreignKey: 'position_uuid'
});

db.Department.hasMany(db.User);
db.User.belongsTo(db.Department, {
  foreignKey: 'department_uuid'
});

db.Project.hasMany(db.Task);
db.Task.belongsTo(db.Project, {
  foreignKey: 'project_uuid'
});

db.User.belongsToMany(db.Task, {
  through: UserTask,
  foreignKey: 'user_uuid',
  otherKey: 'task_uuid'
});

db.Task.belongsToMany(db.User, {
  through: UserTask,
  foreignKey: 'task_uuid',
  otherKey: 'user_uuid'
});

db.User.belongsToMany(db.Project, {
  through: UserProject,
  // as: 'roles',
  foreignKey: 'user_uuid',
  otherKey: 'project_uuid'
});

db.Project.belongsToMany(db.User, {
  through: UserProject,
  // as: 'permissions',
  foreignKey: 'project_uuid',
  otherKey: 'user_uuid'
});

db.ROLES = ['superadmin', 'admin', 'moderator', 'user'];

module.exports = db;
