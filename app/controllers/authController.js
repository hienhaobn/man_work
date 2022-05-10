const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const { userLoginDTO } = require("../dto/userDTO");
const UserHelper = require('../services/user');
const EmployeeProfileHelper = require('../services/employeeProfile');
const RoleService = require("../services/role");
const EmployeeProfile = db.EmployeeProfile;
const User = db.User;
const Role = db.Role;
const Op = db.Sequelize.Op;

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { token } = req.headers;
    if (token) {
      const accessToken = token.split(' ')[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          res.status(403).json('Token is not valid');
        }
        req.user = user;
      });
    } else {
      res.status(401).json('You are not authenticated');
    }
    /**
     * body: {
     *  username,
     * password,
     * role
     *}
     */
    // save user info to table user
    // getID nhan vien
    const ROLE_USER = 3;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    // truong hop tim duoc va thieu truong hop khong tim duoc
    const role = await Role.findOne({
      where: {
        code: {
          [Op.eq]: ROLE_USER,
        },
      },
    });

    const roleId = role.uuid;
    const user = await User.create({
      RoleUuid: roleId,
    });

    // save username, password to employeeProfile
    const employeeProfile = await EmployeeProfile.create({
      UserUuid: user.uuid,
      username,
      password: hashed,
    });

    const data = {
      user,
      employeeProfile,
    };
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// GENERATE ACCESS TOKEN
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "30d" }
  );
};

// GENERATE REFRESH TOKEN
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );
};
// LOGIN
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const queryFields = [
      {username},
    ];
    const employeeProfile = await EmployeeProfileHelper.getOneEmployeeProfileByFields(queryFields, ['username', 'uuid', 'password']);
    const roleId = employeeProfile.User.RoleUuid;
    const role = await RoleService.getRoleById(roleId);
    const roleName = role.name;

    if (!employeeProfile) {
      return res.status(404).json("Wrong username!");
    }
    const validPassword = await bcrypt.compare(
      password,
      employeeProfile.password
    );
    if (!validPassword) {
      return res.status(404).json("Wrong password!");
    }

    if (employeeProfile && validPassword) {
      const userId = employeeProfile.User.uuid;
      const username = employeeProfile.username;
      const user = {
        id: userId,
        username,
        role: roleName,
      }
      const accessToken = authController.generateAccessToken(user);
      // token du tru, khong phai token hay su dung
      const refreshToken = authController.generateRefreshToken(user);

      // add refreshToken to cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true, //
        secure: false, // chay product can chuyen sang true
        path: "/",
        sameSite: "strict", // ngan chan tan cong cros
      });
      // DTO
      const userData = userLoginDTO(employeeProfile);
      return res.status(200).json({ ...userData, accessToken, role: roleName });
      // return res.status(200).json(employeeProfile);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// STORE TOKEN
//1, LOCAL STORAGE: de bi tan cong XSS
// 2, HTTPONLY COOKIE -> it anh huong boi XSS, de bi tan cong CSRF -> co the khac phuc bang SAMETITE
//3, REDUX STOTE -> de luuw accesstoken
// HTTPONLY COOKIE -> de luu refeshtoken

// toi uu bao mat nhat: BFF PATTERN ( BACKEND FOR FONTEND)

// Sử dụng trong trường hợp accessToken hết hạn
// Thường refreshToken lưu vào trong database để tránh trường hợp trùng lặp -> REDIS

// ví dụ database
const requestRefreshToken = (req, res) => {
  try {
    // TODO: Để tạm sau lưu trong DB
    let refreshTokens = [];
    // take refresh token from user
    const { refreshToken } = req.cookies;

    if (!refreshToken) return res.status(401).json("You are not authenticated");

    // check token
    // if (refreshTokens.includes(refreshToken)) {
    //   return res.status(403).status("Refresh token is not valid");
    // }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }

      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      // create new accessToken, refresh token
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(refreshToken);
      // add refreshToken to cookie
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true, //
        secure: false, // chay product can chuyen sang true
        path: "/",
        sameSite: "strict", // ngan chan tan cong cros
      });

      res.status(200).json({accessToken: newAccessToken});
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const logout = async (req, res) => {
  res.clearCookie('refreshToken');
  res.status(200).json('Logged out!')
}

const authController = {
  generateAccessToken,
  generateRefreshToken,
  register,
  login,
  logout,
  requestRefreshToken,
};

module.exports = authController;
