const express = require('express');
const { deleteUser, updateUser } = require('../controllers/userController');

const router = express.Router();

router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

module.exports = router;
