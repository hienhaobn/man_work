const router = require('express').Router();
const PositionController = require('../controllers/positionController');

router.get('/', PositionController.getAll);

router.get('/:id', PositionController.getOne);

router.post('/', PositionController.create);

router.patch('/:id', PositionController.update);

router.delete('/:id', PositionController.remove)

module.exports = router;
