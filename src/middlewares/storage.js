const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const randomNumber = Math.floor(Math.random() * 10000);
        cb(null, Date.now() + '-' + randomNumber + path.extname(file.originalname));
    }
});

exports.upload = multer({ storage: storage }).single('profile-picture');