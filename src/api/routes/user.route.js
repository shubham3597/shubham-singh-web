const express = require('express');

const {
  users
} = require('../controllers');

const router = express.Router();

router.post('/', users.addUser);
router.get('/', users.getAllUsers);
router.get('/:userId', users.getUser);
router.put('/:userId', users.updateUser);

module.exports = router;