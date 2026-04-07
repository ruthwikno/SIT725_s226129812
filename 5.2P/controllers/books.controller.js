// Import the service
const bookService = require('../services/bookService');

// Controller uses the service to get data
exports.getAllBooks = (req, res) => {
  const items = bookService.getAllBooks();
  res.json({
    status: 200,
    data: items,
    message: 'Books are being retrieved using service'
  });
};