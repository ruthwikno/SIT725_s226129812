# SIT725 Assignment 5.2P: 
A Books Catalog built with Node.js and Express, following the MVC (Model-View-Controller).

## Project Structure
5.2P/
- `controllers/` 
  - `books_controllers.js` - Handles requests
  - `index.js` - file to export controllers
- `package.json` - project metadata and scripts.
- `public/`:
  - `index.html` - main page for Book catalog.
  - `css/styles.css` - custom styles
  - `js/scripts.js` - client side fetch logic
-  `routes/`
  - `books_routes.js` - Defines API endpoints
- `services/`
  - `books_server.js` - In-memory data and logic
- `server.js` - Express server setup .

## Prereuisities
- Node.js should be installed.

## How to run

1. clone or download the repository
(use these commands in the terminal)
2. navigate to 5.2P
   - cd 5.2P
3. Install dependencies
   - npm install
4. Start the server 
   - npm start 
5. the server will start at
   - http://localhost:3000
6. the API for books
   - http://localhost:3000/api/books   

## Technologies Used

- Node.js
- Express.js
- HTML, CSS, and JavaScript

