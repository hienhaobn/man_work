const router = require('express').Router();
const RoleController = require('../controllers/roleController');

// GET ALL
router.get('/', RoleController.getAll);

// CREATE
router.post('/', RoleController.create);

router.post('/add-permission', RoleController.addPermissions);

// GET ONE
router.get('/:id', RoleController.getOne);

// UPDATE
router.patch('/', RoleController.update);

// DELETE
router.delete('/', RoleController.deleteRole);

module.exports = router;
