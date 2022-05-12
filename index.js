// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const db = require("./app/models");
const authRoute = require('./app/routes/auth');
const userRoute = require('./app/routes/user');
const uploadRoute = require('./app/routes/upload');
const roleRoute = require('./app/routes/role');
const positionRoute = require('./app/routes/position');
const departmentRoute = require('./app/routes/department');

const initData = require('./app/helpers/initData');
/**
 * app variable
 */

const app = express();
const optionCORS = {
  origin: `http://localhost:8081`,
}
// db.sequelize.sync({force: true}).then(() => {

db.sequelize.sync().then(() => {
  console.log('Drop and Resync Db');
  // initData();
}).catch(err => {
  console.log(err);
});

/**
 * app config
 */
app.use(cors(optionCORS));
app.use(helmet());
// parse request of content-type - application/json
app.use(express.json());
app.use(cookieParser());
// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

/**
 * routes definition
 */

app.get('/', (req, res) => {
  // res.status(200).send({message: 'get default'});
  res.status(200).json({ message: 'Hello friend' })
});

app.use('/v1/auth', authRoute);
app.use('/v1/user', userRoute);
app.use('/v1/upload', uploadRoute);
app.use('/v1/role', roleRoute);
app.use('/v1/position', positionRoute);
app.use('/v1/department', departmentRoute);

module.exports = app;
