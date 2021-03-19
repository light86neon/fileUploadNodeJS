const JWT = require('jsonwebtoken');

const O_Auth = require('../dataBase/models/O_Auth');
const { JWT_SECRET } = require('../configs/config');
const { constants } = require('../constants');

const errorMessage = require('../constants/error.message');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                throw new Error(errorMessage.TOKEN_IS_REQUIRED);
            }
            JWT.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new Error(errorMessage.TOKEN_IS_NOT_VALID);
                }
            });

            const tokens = await O_Auth.findOne({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new Error(errorMessage.TOKEN_IS_NOT_VALID);
            }

            // eslint-disable-next-line no-console
            console.log(access_token);

            req.user = tokens._user_id;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
