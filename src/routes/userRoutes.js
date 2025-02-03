const express = require('express');
const { getAllUsers, deleteUser, updateUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

module.exports = router;
