const { upload } = require('../config/multerConfig');

const uploadPhotoMiddleware = (req, res, next) => {
  upload.single('image')(req, res, (error) => {
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  });
};

module.exports = { uploadPhotoMiddleware };
