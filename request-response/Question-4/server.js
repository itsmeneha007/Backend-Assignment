const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

const PORT = 1500;
const dbPath = path.join(__dirname, 'db.json');

const readBooks = () => {
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8') || '[]');
};

const writeBooks = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};


app.get('/books', (req, res) => {
  const books = readBooks();
  res.status(200).json(books);
});


app.get('/books/:id', (req, res) => {
  const books = readBooks();
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.status(200).json(book);
});


app.post('/books', (req, res) => {
  const { id, title, author, year } = req.body;
  if (!id || !title || !author || !year) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const books = readBooks();
  if (books.some(b => b.id === id)) {
    return res.status(409).json({ message: "Book with this ID already exists" });
  }

  const newBook = { id, title, author, year };
  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
});


app.put('/books/:id', (req, res) => {
  const books = readBooks();
  const index = books.findIndex(b => b.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ message: "Book not found" });

  books[index] = { ...books[index], ...req.body };
  writeBooks(books);
  res.status(200).json(books[index]);
});

app.delete('/books/:id', (req, res) => {
  let books = readBooks();
  const index = books.findIndex(b => b.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ message: "Book not found" });

  const deleted = books.splice(index, 1);
  writeBooks(books);
  res.status(200).json({ message: "Book deleted", deleted });
});

app.get('/books/search', (req, res) => {
  const { author, title } = req.query;
  const books = readBooks();

  let result = books;

  if (author) {
    result = result.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  }

  if (title) {
    result = result.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
  }

  if (result.length === 0) {
    return res.status(404).json({ message: "No books found" });
  }

  res.status(200).json(result);
});


app.use('*', (req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





