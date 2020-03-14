const multer = require('multer');

const rejectFile = function (req, file, callback) {
    if (file.mimeType === 'image/jpg' || file.mimeType === 'image/png') {
        callback(new Error('Only jpg or png image types allowed'), true);
    } else {
        callback(null, false);
    }
};

const storageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images/'); //err, path
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname.replace(/ /g, ''));
    }
});

const uploader = multer({
    storage: storageConfig,
    fileFilter: rejectFile,
    limits: {
        fileSize: (1024 * 1024) * 10 //10MB
    }
});

module.exports = uploader;