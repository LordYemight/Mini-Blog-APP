const multer = require('multer');
const path = require('path');

// Storage configuration for foodImg
const Images = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images'); // Set the destination folder for foodImg
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
// Multer middleware for foodImg
const postImage = multer({ storage: Images }).single('file');

module.exports = { postImage };
