const express = require('express');
const { getAllUsers, deleteUser, updateUser } = require('../controllers/userController');
const { uploadPhotoMiddleware } = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', uploadPhotoMiddleware, updateUser);

module.exports = router;
