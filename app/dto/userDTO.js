// {
// 	userId: string
// 	username: string
// 	role: string
// 	permission: []
// 	name: string
// 	address: string
// 	dob: string
// 	avatar: string
// 	sex: string
// 	phone: string
// 	accessToken: string
// }

// LOGIN
const userLoginDTO = (user) => {
  const { uuid, username, fullName, dob, gender, avatar, phone } = user;
  const userData = {
    uuid,
    username,
    fullName,
    dob,
    gender,
    avatar,
    phone,
    role: user.Role.name
  }
  return userData;
};

// TODO: can toi uu lai ham nay
const getAllUser = (users) => {
  // const result = [];
  // users.map(user => {
  //   const {
  //     uuid,
  //     managerId,
  //     manageAddressId,
  //     name,
  //     dob,
  //     sex,
  //     avatar,
  //     phone,
  //     nativePlace,
  //     placeOfPermanent,
  //     issuedPlace,
  //     status,
  //     ProvinceUuid,
  //     TownUuid,
  //     VillageUuid,
  //     // EmployeeProfile,
  //   } = user;
  //   const { username, salary, Department, Position } = EmployeeProfile;
  //   const departmenName = Department.name;
  //   const positionName = Position.name;
  //   result.push({
  //     uuid,
  //     managerId,
  //     manageAddressId,
  //     name,
  //     dob,
  //     sex,
  //     avatar,
  //     phone,
  //     nativePlace,
  //     placeOfPermanent,
  //     issuedPlace,
  //     status,
  //     ProvinceUuid,
  //     TownUuid,
  //     VillageUuid,
  //     username,
  //     salary,
  //     Department: departmenName,
  //     Position: positionName,
  //   });
  // });
  // return result;
}

const userDTO = {
  userLoginDTO,
  getAllUser,
};

module.exports = userDTO;
