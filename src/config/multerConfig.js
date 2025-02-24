const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cosplay_empire',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => `image-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
  },
});

const upload = multer({ storage });

module.exports = { upload };
