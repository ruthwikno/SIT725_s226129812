const Book = require('../models/book.model');
  
  // Service function to get all books 
const getAllBooks = async () => {
  return await Book.find();
};
 
const getBookById = async (id) => {
  return await Book.findById(id);
};
 
module.exports = {
  getAllBooks,
  getBookById
};