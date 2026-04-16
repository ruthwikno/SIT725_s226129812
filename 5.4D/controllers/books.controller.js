const bookService = require('../services/books.service');

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const items = await bookService.getAllBooks();
    res.json({
      status: 200,
      data: items,
      message: 'Books retrieved successfully',
      developedBy: 's226129812'
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Failed to retrieve books' });
  }
};

// Get by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookByCustomId(req.params.id);
    if (!book) {
      return res.status(404).json({ status: 404, message: 'Book not found' });
    }
    res.json({ status: 200, data: book, message: 'Book retrieved successfully' });
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Failed to retrieve book' });
  }
};

// CREATE
exports.createBook = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
    return res.status(201).json({
      status: 201,
      data: book,
      message: 'Book created successfully'
    });
  } catch (err) {
    // Duplicate key
    if (err.type === 'DUPLICATE' || err.code === 11000) {
      return res.status(409).json({ status: 409, message: err.message || 'Duplicate id' });
    }
    // Unknown field or immutable field
    if (err.type === 'UNKNOWN_FIELD' || err.type === 'IMMUTABLE') {
      return res.status(400).json({ status: 400, message: err.message });
    }
    // Mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message).join('; ');
      return res.status(400).json({ status: 400, message: messages });
    }
    // Any other validation error thrown by service
    if (err.type === 'VALIDATION') {
      return res.status(400).json({ status: 400, message: err.message });
    }
    return res.status(500).json({ status: 500, message: 'Failed to create book' });
  }
};

// UPDATE
exports.updateBook = async (req, res) => {
  try {
    const book = await bookService.updateBook(req.params.id, req.body);
    return res.status(200).json({
      status: 200,
      data: book,
      message: 'Book updated successfully'
    });
  } catch (err) {
    if (err.type === 'NOT_FOUND') {
      return res.status(404).json({ status: 404, message: err.message });
    }
    if (err.type === 'UNKNOWN_FIELD' || err.type === 'IMMUTABLE') {
      return res.status(400).json({ status: 400, message: err.message });
    }
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message).join('; ');
      return res.status(400).json({ status: 400, message: messages });
    }
    if (err.type === 'VALIDATION') {
      return res.status(400).json({ status: 400, message: err.message });
    }
    return res.status(500).json({ status: 500, message: 'Failed to update book' });
  }
};