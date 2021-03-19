const bcrypt = require('bcrypt');

const { errorMessageEnum } = require('../constants');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPasswordEquals = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEquals) {
            throw new Error(errorMessageEnum.WRONG_EMAIL_OR_PASSWORD);
        }
    }
};
