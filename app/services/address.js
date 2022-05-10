const db = require('../models');

const create = (address) => {
    return db.Addresses.create(address);
};

const update = async (id ,data) => {
    return db.Addresses.findByPk(id).then((a) => {
        if (!a) {
            console.log('Address not found!');
            return null;
        }
        a.update(data).then(result => result).catch(err => console.log(err));
    }).catch(err => console.log(err));

};

const getAll = () => {
    return db.Addresses.findAll({});
};

const getById = (id) => {
    return db.Addresses.findByPk(id);
};

const getAllByType = (type) => {
    return db.Addresses.findAll({
        where: {
            ['type']: {
                [db.Sequelize.Op.eq]: type
            }
        }
    });
};

const getAllByParentId = (parentId) => {
    return db.Addresses.findAll({
        where: {
            ['parentId']: {
                [db.Sequelize.Op.eq]: parentId
            }
        }
    });
};

const deleteAddress = (id) => {
    // delete child

    // delete parent

};

const AddressService = {
    create,
    update,
    getAll,
    getById,
    getAllByParentId,
    getAllByType,
    deleteAddress,
};

module.exports = AddressService;
