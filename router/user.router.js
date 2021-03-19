const router = require('express').Router();

const userController = require('../controller/userController');
const { authMiddlewares, fileMiddlewars, userMiddlewares } = require('../middleware');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddlewares.checkIsIdValid, userController.getSingleUser);
router.delete('/:userId', authMiddlewares.checkAccessTokenMiddleware, userController.deleteUser);

router.post(
    '/',
    fileMiddlewars.checkFile,
    fileMiddlewars.checkAvatar,
    userMiddlewares.isUserValid,
    userController.createUser
);

module.exports = router;
