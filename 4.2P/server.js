
var express = require("express")
var app = express()
var port = process.env.port || 3000;
const mongoose = require('mongoose');
// Middleware
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
const Car = mongoose.model('Car', CarSchema,'cars');
// 3. REST API route
app.get('/api/cars', async (req, res) => {
const cars = await Car.find({});
res.json({ statusCode: 200, data: cars, message: 'Success' });
});
// 4. Start server
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
  console.log(`API available at http://localhost:${port}/api/cars`);
});


