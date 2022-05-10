const router = require('express').Router();
const AddressController = require('../controllers/addressController');

router.get('/', AddressController.getAll);

router.get('/:id', AddressController.getOne);

router.get('/:parentId', AddressController.getAllByParentId);

router.post('/', AddressController.create);

router.patch('/', AddressController.update);

router.delete('/', AddressController.deleteAddress);


module.exports = router;
