const User = require('../dataBase/models/User');
require('../dataBase/models/Car');

module.exports = {
    findUsers: (filterObject) => User.find(filterObject),

    findUserById: (userId) => User.findById(userId),

    createUser: (userObject) => User.create(userObject),

    // deleteUser: (id) => User.findByIdAndDelete({id})
    deleteUser: (id) => User.findByIdAndDelete(id, (err) => {
        // eslint-disable-next-line no-console
        if (err) console.log(err);
    }),

    updateUserById: (userId, updateObject) => User.updateOne({ _id: userId }, { $set: updateObject })
};
