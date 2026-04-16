const Book = require('../models/book_model');

// Documented fields for create and update operations. Used for validation and error handling in service layer.
const ALLOWED_CREATE_FIELDS = ["id", "title", "author", "year", "genre", "summary", "price"];
const ALLOWED_UPDATE_FIELDS = ["title", "author", "year", "genre", "summary", "price"];

// GET ALL 
const getAllBooks = async () => {
  return await Book.find();
};

// GET BY ID 
const getBookById = async (id) => {
  return await Book.findById(id);
};

// GET BY CUSTOM id FIELD 
const getBookByCustomId = async (id) => {
  return await Book.findOne({ id });
};

// CREATE 
const createBook = async (data) => {
  // Whitelist — reject unknown fields
  const extraFields = Object.keys(data).filter(k => !ALLOWED_CREATE_FIELDS.includes(k));
  if (extraFields.length > 0) {
    const err = new Error(`Unknown field(s): ${extraFields.join(", ")}`);
    err.type = "UNKNOWN_FIELD";
    throw err;
  }

  // Check for required fields presence (surface a clear message before Mongoose)
  for (const field of ALLOWED_CREATE_FIELDS) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      const err = new Error(`${field} is required`);
      err.type = "VALIDATION";
      throw err;
    }
  }

  // Duplicate id check
  const existing = await Book.findOne({ id: data.id });
  if (existing) {
    const err = new Error(`A book with id '${data.id}' already exists`);
    err.type = "DUPLICATE";
    throw err;
  }

  // Convert price string → Decimal128
  const priceStr = String(data.price);
  const priceNum = parseFloat(priceStr);
  if (isNaN(priceNum) || priceNum < 0) {
    const err = new Error("Price must be a non-negative number");
    err.type = "VALIDATION";
    throw err;
  }

  const book = new Book({
    id: data.id,
    title: data.title,
    author: data.author,
    year: data.year,
    genre: data.genre,
    summary: data.summary,
    price: require('mongoose').Types.Decimal128.fromString(priceStr)
  });

  return await book.save();
};

// UPDATE
const updateBook = async (customId, data) => {
  // Immutability — id cannot be changed
  if (data.id !== undefined) {
    const err = new Error("id is immutable and cannot be changed");
    err.type = "IMMUTABLE";
    throw err;
  }

  // Whitelist — reject unknown fields
  const extraFields = Object.keys(data).filter(k => !ALLOWED_UPDATE_FIELDS.includes(k));
  if (extraFields.length > 0) {
    const err = new Error(`Unknown field(s): ${extraFields.join(", ")}`);
    err.type = "UNKNOWN_FIELD";
    throw err;
  }

  // Find the book
  const book = await Book.findOne({ id: customId });
  if (!book) {
    const err = new Error("Book not found");
    err.type = "NOT_FOUND";
    throw err;
  }

  // Apply updates 
  const allowedKeys = ALLOWED_UPDATE_FIELDS;
  for (const key of allowedKeys) {
    if (data[key] !== undefined) {
      if (key === "price") {
        const priceStr = String(data.price);
        const priceNum = parseFloat(priceStr);
        if (isNaN(priceNum) || priceNum < 0) {
          const err = new Error("Price must be a non-negative number");
          err.type = "VALIDATION";
          throw err;
        }
        book.price = require('mongoose').Types.Decimal128.fromString(priceStr);
      } else {
        book[key] = data[key];
      }
    }
  }

  // Mongoose validation runs on save
  return await book.save();
};

module.exports = {
  getAllBooks,
  getBookById,
  getBookByCustomId,
  createBook,
  updateBook
};