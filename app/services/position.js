const db = require('../models');

const create = (position) => {
  return db.Position.create(position);
};

const update = () => {

};

const remove = () => {

};

const getAll = () => {

};

const getById = () => {

};

const PositionService = {
  create,
  update,
  remove,
  getAll,
  getById,
};

module.exports = PositionService;
