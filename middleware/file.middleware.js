const {
    DOCS_MIMETYPES,
    FILE_MAX_SIZE,
    PHOTO_MAX_SIZE,
    PHOTOS_MIMETYPES,
    VIDEOS_MIMETYPES,
    VIDEO_MAX_SIZE
} = require('../constants/constants');

const { errorMessageEnum } = require('../constants');

module.exports = {
    checkFile: (req, res, next) => {
        try {
            const { files } = req;

            const docs = [];
            const photos = [];
            const videos = [];

            req.docs = docs;
            req.photos = photos;
            req.videos = videos;

            const allFiles = Object.values(files);

            for (let i = 0; i < allFiles.length; i++) {
                const { name, size, mimetype } = allFiles[i];

                if (PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (PHOTO_MAX_SIZE < size) {
                        throw new Error(`file ${name} is too big`);
                    }

                    photos.push(allFiles[i]);
                } else if (DOCS_MIMETYPES.includes(mimetype)) {
                    if (FILE_MAX_SIZE < size) {
                        throw new Error(`file ${name} is too big`);
                    }

                    videos.push(allFiles[i]);
                } else if (VIDEOS_MIMETYPES.includes(mimetype)) {
                    if (VIDEO_MAX_SIZE < size) {
                        throw new Error(`file ${name} is too big`);
                    }

                    docs.push(allFiles[i]);
                } else {
                    throw new Error(errorMessageEnum.NOT_VALID_FILE);
                }
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    checkAvatar: (req, res, next) => {
        try {
            if (req.photos.length > 1) {
                throw new Error(errorMessageEnum.JUST_ONE_PHOTO);
            }

            [req.avatar] = req.photos;
            next();
        } catch (e) {
            next(e);
        }
    }
};
