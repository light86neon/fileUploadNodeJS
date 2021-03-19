const db = require('../../dataBase/MySQL');

module.exports = {
    findAll: () => {
        const Student = db.getModel('Student');

        return Student.findAll();
    },

    createStudent: (userObject) => {
        const Student = db.getModel('Student');

        return Student.create(userObject);
    }
};
