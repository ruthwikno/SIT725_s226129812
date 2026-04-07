
var express = require("express")
var app = express()
var port = process.env.port || 3000;
const mongoose = require('mongoose');
// 1.Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/supercar');
mongoose.connection.on('connected', () => {
console.log('Connected to MongoDB');
});
// 2. Define your schema and model
const CarSchema = new mongoose.Schema({
title: String,
image: String,
link: String,
description: String,
});

const UserSchema = new mongoose.Schema({
first_name: String,
last_name: String,
email: String,
password: String
});


const Car = mongoose.model('Car', CarSchema,'cars');
const User = mongoose.model('User', UserSchema, 'users');

// 3. REST API route
app.get('/api/cars', async (req, res) => {
const cars = await Car.find({});
res.json({ statusCode: 200, data: cars, message: 'Success' });
});

app.post('/api/signup', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ statusCode: 200, message: 'User saved successfully' });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: 'Server error' });
  }
});
// 4. Start server
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});


