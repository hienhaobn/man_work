const router = require('express').Router();
const DepartmentController = require('../controllers/departmentController');

router.get('/', DepartmentController.getAll);

router.get('/:id', DepartmentController.getOne);

router.post('/', DepartmentController.create);

router.patch('/:id', DepartmentController.update);

router.delete('/:id', DepartmentController.remove)

module.exports = router;
