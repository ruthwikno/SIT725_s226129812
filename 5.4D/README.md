# SIT725 Assignment 5.4D: 
A Books Catalog built with Node.js and Express, following the MVC (Model-View-Controller) architecture using MongoDB as its database.

## Project Structure
5.3C/
- `controllers/` 
  - `books_controllers.js` - Handles requests
  - `index.js` - file to export controllers
- `models/` 
  - `book.model.js` - Mongoose schema
- `package.json` - project metadata and scripts.
- `public/`:
  - `index.html` - main page for Book catalog.
  - `css/styles.css` - custom styles
  - `js/scripts.js` - client side fetch logic
-  `routes/`
  - `books_routes.js` - Defines API endpoints
- `services/`
  - `books_service.js` - MongoDB queries
- `seed.js` - Populates MongoDB with 5 sample books 
- `server.js` - Express + mongoose server setup .

## Prereuisities
- Node.js should be installed.
- MongoDb should be locally running on 27017

## How to run

1. clone or download the repository

# (use these commands in the terminal)#
2. navigate to 5.3C
   - cd 5.3C
3. Install dependencies
   - npm install
4. Check if MongoDB is running locally
   - mongod
5. Seed the Database
   - node.js
   - Expected Output:
         Connected to MongoDB
         Cleared existing books
         Seeded 5 books successfully
         Disconnected from MongoDB
6. Start the server 
   - npm start 
7. the server will start at
   - http://localhost:3000
8. the API for books
   - http://localhost:3000/api/books   

## Technologies Used

- Node.js
- Express.js
- HTML, CSS, and JavaScript
- MongoDB