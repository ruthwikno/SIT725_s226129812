const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;

// Connect to MongoDB
const MONGO_URI = 'mongodb://localhost:27017/booksdb';
 
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
//to access public folder for static files
app.use(express.static('public'));

// Import route file
const bookRoutes = require('./routes/books.routes');

// Mount the route at /api/books
app.use('/api/books', bookRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Book Server Home Page!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log('books can be accessed at http://localhost:3000/api/books');
});