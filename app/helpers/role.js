const { ROLE_NAME, ROLE_TYPE } = require('../constants/Role');

function convertRoleNameToRoleType(roleName) {
  switch (roleName) {
    case ROLE_NAME.SUPERADMIN:
      return ROLE_TYPE.SUPERADMIN;
    case ROLE_NAME.MODERATOR:
      return ROLE_TYPE.MODERATOR;
    case ROLE_NAME.ADMIN:
      return ROLE_TYPE.ADMIN;
    case ROLE_NAME.USER:
      return ROLE_TYPE.USER;
    case ROLE_NAME.CUSTOMER:
      return ROLE_TYPE.CUSTOMER;
    default:
      return ROLE_TYPE.CUSTOMER;
  }
}

const roleHelper = {
  convertRoleNameToRoleType,
};

module.exports = roleHelper;
