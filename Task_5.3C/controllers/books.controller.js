// Import the service
const bookService = require('../services/books.service');

// Controller uses the service to get data
exports.getAllBooks = (req, res) => {
  const items = bookService.getAllBooks();
  res.json({
    status: 200,
    data: items,
    message: 'Books are being retrieved using service'
  });
};
// Controller to get a book by ID
exports.getBookById = (req, res) => {
  const book = bookService.getBookById(req.params.id);
  if (!book) {
    return res.status(404).json({ status: 404, message: 'Book not found' });
  }
  res.json({ status: 200, data: book, message: 'Book retrieved successfully' });
};