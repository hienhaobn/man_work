const router = require('express').Router();
const PermissionsController = require('../controllers/permissionController');

// GET ONE
router.get('/', PermissionsController.getOne);

// GET ALL
router.get('/', PermissionsController.getAll);

// CREATE
router.post('/', PermissionsController.create);

// UPDATE
router.patch('/', PermissionsController.update);

// DELETE
router.delete('/', PermissionsController.deletePermissions);

module.exports = router;
