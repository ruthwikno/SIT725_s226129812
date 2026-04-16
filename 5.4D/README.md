# SIT725 Assignment 5.4D: 
A Books Catalog built with Node.js and Express, following the MVC (Model-View-Controller) architecture using MongoDB as its database.This task extends 5.3C by adding field-level validation, safe-write endpoints, and a validation test script.
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
- `server.js` - Express + mongoose server setup.
- `validation.test.js` - Validation test script

## Prereuisities
- Node.js should be installed.
- MongoDb should be locally running on 27017

## How to run

1. clone or download the repository

# (use these commands in the terminal)#
2. navigate to 5.4D
   - cd 5.4D  
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

# Running the Validation Tests
The validation test script sends real HTTP requests to your running server and checks that all validation rules are correctly enforced.

You need two terminals open at the same time:

1. Terminal 1 — start the server:
   - npm start
2. Terminal 2 — run the tests:
   - node validation-tests.js 
   - Expected Output:
      SIT725_VALIDATION_TESTS
      BASE_URL=http://localhost:3000
      API_BASE=/api/books
      INFO|Generated uniqueId=b1234567890
      TEST|T01|Valid create|POST|/api/books|expected=201|actual=201|pass=Y
      TEST|T02|Duplicate ID|POST|/api/books|expected=409|actual=409|pass=Y
      ...
      SUMMARY|pass=Y|failed=0|total=37
      COVERAGE|CREATE_FAIL=22|UPDATE_FAIL=10|TYPE=6|REQUIRED=6|BOUNDARY=6|LENGTH=7|TEMPORAL=3|UNKNOWN_CREATE=2|UNKNOWN_UPDATE=2|IMMUTABLE=1

## Technologies Used

- Node.js
- Express.js
- HTML, CSS, and JavaScript
- MongoDB