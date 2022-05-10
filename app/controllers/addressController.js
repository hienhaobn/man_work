const AddressService = require('../services/address');

const create = async (req, res, next) => {
    try {
        const { parentId = '', name, type } = req.body;
        const address = await AddressService.create({ parentId, name, type });
        if (!address) {
            console.log("Address can't add!");
            return res.status(404).json({message: 'Can not add'});
        }
        return res.status(200).json(address);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

const getAll = async (req, res, next) => {
    try {
        const address = await AddressService.getAll();
        if (address.length === 0) {
            console.log('No data');
            return res.status(201).json([]);
        }
        return res.status(200).json(address);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

const getOne = async (req, res, next) => {
    try {
        const addressId = req.params.id;
        const address = await AddressService.getById(addressId);
        if (!address) {
            console.log('Cannot find Address!');
            return res.status(201).json({});
        }
        return res.status(200).json(address);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

const getAllByType = async (req, res, next) => {
    try {
        const { type } = req.params;
        const address = await AddressService.getAllByType(type);
        if (!address) {
            console.log('Cannot find Address!');
            return res.status(201).json({});
        }
        return res.status(200).json(address);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

const getAllByParentId = async (req, res, next) => {
    try {
        const { parentId } = req.params;
        const address = await AddressService.getAllByParentId(parentId);
        if (!address) {
            console.log('Address not found!');
            return res.status(201).json({});
        }
        return res.status(200).json(address);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

const update = async (req, res, next) => {
    try {
        const addressId = req.params.id;
        const address = await AddressService.update(addressId, req.body);
        if (!address) {
            console.log('Can not update');
            return res.status(404).json({message: 'Can not update'});
        }
        return res.status(200).json(address);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

const deleteAddress = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

const AddressController = {
    create,
    getAll,
    getOne,
    getAllByType,
    getAllByParentId,
    update,
    deleteAddress,
};

module.exports = AddressController;
