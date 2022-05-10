const PositionService = require('../services/position');

const create = async (req, res, next) => {
  try {
    const position = await PositionService.create(req.body);
    if (!position) {
        console.log('Cannot create position!');
        return res.status(404).json({message: 'cannot create position'})
    }
    return res.status(200).json(position);
  } catch (error) {
      console.log(error);
      return res.status(500).json(error);
  }
};

const update = async (req, res, next) => {
    try {
        const positionId = req.params.id;
        const position = await PositionService.update(positionId, req.body);
        if (!position) {
            console.log('Cannot update position');
            return res.status(404).json({message: 'cannot update position'});
        }
        return res.status(200).json(position);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const positionId = req.params.id;
        const position = await PositionService.removePosition(positionId);
        if (!position) {
            console.log('Cannot remove position');
            return res.status(404).json({message: 'cannot remove position'});
        }
        return res.status(200).json(position);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const positions = await PositionService.getAll();
        if (positions.length === 0) {
            console.log('No data');
            return res.status(201).json([]);
        }
        return res.status(200).json(positions);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const getOne = async (req, res, next) => {
    try {
        const positionId = req.params.id;
        const position = await PositionService.getById(positionId);
        if (!position) {
            console.log('Cannot remove position');
            return res.status(404).json({message: 'cannot remove position'});
        }
        return res.status(200).json(position);
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
}

module.exports = PositionController;
