const express = require('express');
const router = express.Router();
const Controllers = require('../controllers');

// READ routes
router.get('/', Controllers.bookController.getAllBooks);
router.get('/:id', Controllers.bookController.getBookById);

// SAFE-WRITE routes
router.post('/', Controllers.bookController.createBook);
router.put('/:id', Controllers.bookController.updateBook);

module.exports = router;