const DepartmentService = require('../services/department');

const create = async (req, res, next) => {
    try {
        const department = await DepartmentService.create(req.body);
        if (!department) {
            console.log('Cannot create position!');
            return res.status(404).json({message: 'cannot create position'})
        }
        return res.status(200).json(department);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const update = async (req, res, next) => {
    try {
        const departmentId = req.params.id;
        const department = await DepartmentService.update(departmentId, req.body);
        if (!department) {
            console.log('Cannot update position');
            return res.status(404).json({message: 'cannot update position'});
        }
        return res.status(200).json(department);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const departmentId = req.params.id;
        const department = await DepartmentService.remove(departmentId);
        if (!department) {
            console.log('Cannot remove position');
            return res.status(404).json({message: 'cannot remove position'});
        }
        return res.status(200).json(department);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const departments = await DepartmentService.getAll();
        if (departments.length === 0) {
            console.log('No data');
            return res.status(201).json([]);
        }
        return res.status(200).json(departments);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const getOne = async (req, res, next) => {
    try {
        const departmentId = req.params.id;
        const department = await DepartmentService.getById(departmentId);
        if (!department) {
            console.log('Cannot remove position');
            return res.status(404).json({message: 'cannot remove position'});
        }
        return res.status(200).json(department);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const PositionController = {
    create,
    update,
    remove,
    getAll,
    getOne,
};

module.exports = PositionController;
