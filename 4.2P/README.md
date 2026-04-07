# SIT725 Assignment 4.2P: 
SIT725 assignment 4.2P built using Node.js, Express, and MongoDB. 

## Project Structure

- `server.js` - Express server with static file serving from `public`.
- `package.json` - project metadata and scripts.
- `public/`:
  - `index.html` - main page for the supercar app.
  - `css/styles.css` - custom styles and responsive adjustments.
  - `js/scripts.js` - car cards data array and rendering logic.
  - `images/` - images used in cards.

## How to run

1. Run `npm install` (only dependency is `express`).
2. Run `npm start` to start express server.
3. Open `http://localhost:3000` in browser.

## MongoDB

1. Install MongoDB and make sure it is running on your local machine.
2. The app connects to `mongodb://localhost:27017/supercar` automatically on server start.
3. There are Two collections:
   - `cars` - stores supercar data (title, image, topspeed, horsepower, acceleration, engine)
   - `users` - stores sign up form submissions (first_name, last_name, email, password)
4. Add car documents manually using MongoDB Compass to the `cars` collection.
5. User sign up data is saved automatically when the form is submitted.
