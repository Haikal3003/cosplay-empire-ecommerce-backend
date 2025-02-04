const express = require('express');
const { uploadPhotoMiddleware } = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/uploads', uploadPhotoMiddleware, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  res.json({
    message: 'Image uploaded successfully',
    imagePath: `/uploads/${req.body.folder}/${req.file.filename}`,
  });
});

module.exports = router;
