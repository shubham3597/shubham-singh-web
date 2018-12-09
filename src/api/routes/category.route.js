const express = require('express');

const {
  categories
} = require('../controllers');

const router = express.Router();

router.post('/', categories.addCategory);
router.get('/', categories.getAllCategories);
router.get('/:categoryId', categories.getCategory);
router.put('/:categoryId', categories.updateCategory);
router.delete('/:categoryId', categories.removeCategory);

module.exports = router;