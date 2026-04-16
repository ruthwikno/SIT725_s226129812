const mongoose = require("mongoose");
const { Decimal128 } = mongoose.Schema.Types;

const bookSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Title is required"] },
    author: { type: String, required: [true, "Author is required"] },
    year: { type: Number, required: [true, "Year is required"] },
    genre: { type: String, required: [true, "Genre is required"] },
    summary: { type: String, required: [true, "Summary is required"] },
    price: {
        type: Decimal128,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
        get: v => v?.toString()
    }
}, {
    toJSON: { getters: true }
});

module.exports = mongoose.model("Book", bookSchema);