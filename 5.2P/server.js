const express = require('express');
const app = express();
const PORT = 3000;

// Import route file
const bookRoutes = require('./routes/books');

// Mount the route at /api/books
app.use('/api/books', bookRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Book Server Home Page!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});