const User = require('../dataBase/models/User');
require('../dataBase/models/Car');

module.exports = {
    findUsers: (query = {}) => {
        // limit , page використовуємо для пагінації;
        const { limit = 20, page = 1, ...filters } = query;
        // кількість сторінок яких потрібно пропустити
        const skip = (page - 1) * limit;
        const keys = Object.keys(filters);
        const filterObject = {};

        keys.forEach((key) => {
            switch (key) {
                case 'priceGte':
                    filterObject.price = { $gte: filters.priceGte };
                    break;
                case 'priceLte':
                    filterObject.price = { ...filterObject.price, $lte: +filters.priceLte };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        User.find(filterObject).limit(limit).skip(skip);
    },

    findUserById: (userId) => User.findById(userId),

    createUser: (userObject) => User.create(userObject),

    // deleteUser: (id) => User.findByIdAndDelete({id})
    deleteUser: (id) => User.findByIdAndDelete(id, (err) => {
        // eslint-disable-next-line no-console
        if (err) console.log(err);
    }),

    updateUserById: (userId, updateObject) => User.updateOne({ _id: userId }, { $set: updateObject })
};
