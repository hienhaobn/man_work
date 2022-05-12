const db = require('../models');

const create = (department) => {
    return db.Department.create(department);
};

const update = () => {

};

const remove = () => {

};

const getAll = () => {

};

const getById = () => {

};

const DepartmentService = {
    create,
    update,
    remove,
    getAll,
    getById,
};

module.exports = DepartmentService;
