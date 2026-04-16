const mongoose = require("mongoose");
const { Decimal128 } = mongoose.Schema.Types;

const ALLOWED_GENRES = [
  "Science Fiction",
  "Classic",
  "Historical Fiction",
  "Fantasy",
  "Mystery",
  "Non-Fiction",
  "Biography",
  "Romance",
  "Thriller",
  "Other"
];

const bookSchema = new mongoose.Schema(
  {
    // Custom string ID supplied by the client (immutable after creation)
    id: {
      type: String,
      required: [true, "id is required"],
      unique: true,
      trim: true,
      minlength: [1, "id must be at least 1 character"],
      maxlength: [100, "id must be at most 100 characters"]
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [1, "Title must be at least 1 character"],
      maxlength: [200, "Title must be at most 200 characters"]
    },

    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      minlength: [2, "Author must be at least 2 characters"],
      maxlength: [100, "Author must be at most 100 characters"]
    },

    // Publication year: must be a number, 1000–current year
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1000, "Year must be at least 1000"],
      max: [new Date().getFullYear(), `Year cannot be in the future`],
      validate: {
        validator: Number.isInteger,
        message: "Year must be an integer"
      }
    },

    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: {
        values: ALLOWED_GENRES,
        message: `Genre must be one of: ${ALLOWED_GENRES.join(", ")}`
      }
    },

    summary: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
      minlength: [10, "Summary must be at least 10 characters"],
      maxlength: [2000, "Summary must be at most 2000 characters"]
    },

    // Price in AUD, stored as Decimal128, must be >= 0
    price: {
      type: Decimal128,
      required: [true, "Price is required"],
      validate: {
        validator: function (v) {
          const n = parseFloat(v.toString());
          return !isNaN(n) && n >= 0;
        },
        message: "Price must be a non-negative number"
      },
      get: v => v?.toString()
    }
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true }
  }
);

module.exports = mongoose.model("Book", bookSchema);