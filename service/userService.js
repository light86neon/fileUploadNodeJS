const User = require('../dataBase/models/User');
require('../dataBase/models/Car');

module.exports = {
    findUsers: async (query = {}) => {
        // limit , page використовуємо для пагінації;
        const { limit = 20, page = 1, ...filters } = query;
        // кількість сторінок яких потрібно пропустити
        const skip = (page - 1) * limit;
        const keys = Object.keys(filters);
        const filterObject = {};

        keys.forEach((key) => {
            switch (key) {
                case 'priceGte':
                    filterObject.price = Object.assign({ ...filterObject.price, $lte: +filters.priceGte });
                    break;
                case 'priceLte':
                    filterObject.price = Object.assign({ ...filterObject.price, $lte: +filters.priceLte });
                    break;
                case 'category':
                    let categories = filters.category.split(';');
                    filterObject.category = { $in: categories};
                case 'name':
                    filterObject.name = { $regexp: filters.name, $options: 'i' };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        const user = await User.find(filterObject).limit(+limit).skip(skip);
        const count = await User.countDocuments(filterObject);

        return {
            data: users,
            page,
            limit
        }
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
