// Import the service
const bookService = require('../services/books.service');
 
// Controller uses the service to get data
exports.getAllBooks = async (req, res) => {
  try {
    const items = await bookService.getAllBooks();
    res.json({
      status: 200,
      data: items,
      message: 'Books are being retrieved using service'
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Failed to retrieve books' });
  }
};
 
// Controller to get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ status: 404, message: 'Book not found' });
    }
    res.json({ status: 200, data: book, message: 'Book retrieved successfully' });
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Failed to retrieve book' });
  }
};