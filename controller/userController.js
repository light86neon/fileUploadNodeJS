const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1;

const userService = require('../service/userService');

const { passwordHasher } = require('../helpers');

const { errorMessage, errorCodeEnum } = require('../constants');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findUsers(req.query);

            res.json(users);
        } catch (e) {
            res.status(errorCodeEnum.NOT_FOUND).json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await userService.findUserById(userId);

            // eslint-disable-next-line no-console
            console.log('****************************');
            // eslint-disable-next-line no-console
            console.log(user);
            // eslint-disable-next-line no-console
            console.log('****************************');

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const { body: { password }, avatar } = req;

            const hasPassword = await passwordHasher.hash(password);

            const user = await userService.createUser({ ...req.body, password: hasPassword });

            if (avatar) {
                const pathWithoutStatic = path.join('user', `${user._id}`, 'photos');
                const photoDir = path.join(process.cwd(), 'static', pathWithoutStatic);
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid()}.${fileExtension}`;
                const finalPhotoPath = path.join(photoDir, photoName);

                await fs.mkdir(photoDir, { recursive: true });
                await avatar.mv(finalPhotoPath);

                await userService.updateUserById(user._id, { avatar: path.join(pathWithoutStatic, photoName) });
            }

            res.status(errorCodeEnum.USER_IS_CREATED).json(errorMessage.USER_CREATED);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: (req, res) => {
        try {
            const { userId } = req.params;

            if (userId !== req.user.id) {
                throw new Error(errorMessage.USER_UNAUTHORIZED);
            }

            res.json(`${userId} is deleted`);

            res.json(errorMessage.USER_IS_DELETED);
        } catch (e) {
            res.json(e.message);
        }
    },
};
