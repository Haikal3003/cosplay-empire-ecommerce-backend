const { upload } = require('./multerConfig');

const uploadPhotoMiddleware = (req, res, next) => {
  upload.single('image')(req, res, (error) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

module.exports = { uploadPhotoMiddleware };
