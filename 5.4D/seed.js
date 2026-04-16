const mongoose = require('mongoose');
const Book = require('./models/book.model');
const MONGO_URI = 'mongodb://localhost:27017/booksdb';
 
// five books as with AUD price added as Decimal128
const books = [
  {
    id : 'b1',
    title: 'The Three-Body Problem',
    author: 'Liu Cixin',
    year: 2008,
    genre: 'Science Fiction',
    summary: 'The Three-Body Problem is the first novel in the Remembrance of Earth Past trilogy. The series portrays a fictional past, present, and future wherein Earth encounters an alien civilization from a nearby system of three Sun-like stars orbiting one another, a representative example of the three-body problem in orbital mechanics.',
    price: mongoose.Types.Decimal128.fromString('29.99')
  },
  {
    id : 'b2',
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    year: 1847,
    genre: 'Classic',
    summary: 'An orphaned governess confronts class, morality, and love at Thornfield Hall, uncovering Mr. Rochester\'s secret and forging her own independence.',
    price: mongoose.Types.Decimal128.fromString('22.00')
  },
  {
    id : 'b3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: 1813,
    genre: 'Classic',
    summary: 'Elizabeth Bennet and Mr. Darcy navigate pride, misjudgement, and social expectations in a sharp study of manners and marriage.',
    price: mongoose.Types.Decimal128.fromString('22.00')
  },
  {
    id : 'b4',
    title: 'The English Patient',
    author: 'Michael Ondaatje',
    year: 1992,
    genre: 'Historical Fiction',
    summary: 'In a ruined Italian villa at the end of WWII, four strangers with intersecting pasts confront memory, identity, and loss.',
    price: mongoose.Types.Decimal128.fromString('25.39')
  },
  {
    id : 'b5',
    title: 'Small Gods',
    author: 'Terry Pratchett',
    year: 1992,
    genre: 'Fantasy',
    summary: 'In Omnia, the god Om returns as a tortoise, and novice Brutha must confront dogma, empire, and the nature of belief.',
    price: mongoose.Types.Decimal128.fromString('31.99')
  }
];
 
async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
 
    await Book.deleteMany({});
    console.log('Cleared existing books');
 
    await Book.insertMany(books);
    console.log('Seeded 5 books successfully');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}
 
seed();