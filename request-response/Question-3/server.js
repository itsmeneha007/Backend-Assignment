const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

const PORT = 12345;
const dbPath = path.join(__dirname, 'db.json');

const readDishes = () => {
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8') || '[]');
};

const writeDishes = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};


app.get('/dishes', (req, res) => {
  const dishes = readDishes();
  res.status(200).json(dishes);
});


app.get('/dishes/:id', (req, res) => {
  const dishes = readDishes();
  const dish = dishes.find(d => d.id === parseInt(req.params.id));
  if (!dish) return res.status(404).json({ message: "Dish not found" });
  res.status(200).json(dish);
});


app.post('/dishes', (req, res) => {
  const { id, name, price, category } = req.body;
  if (!id || !name || !price || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const dishes = readDishes();
  if (dishes.some(d => d.id === id)) {
    return res.status(409).json({ message: "Dish with this ID already exists" });
  }

  const newDish = { id, name, price, category };
  dishes.push(newDish);
  writeDishes(dishes);
  res.status(201).json(newDish);
});

app.put('/dishes/:id', (req, res) => {
  const dishes = readDishes();
  const index = dishes.findIndex(d => d.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ message: "Dish not found" });

  dishes[index] = { ...dishes[index], ...req.body };
  writeDishes(dishes);
  res.status(200).json(dishes[index]);
});


app.delete('/dishes/:id', (req, res) => {
  let dishes = readDishes();
  const index = dishes.findIndex(d => d.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ message: "Dish not found" });

  const deleted = dishes.splice(index, 1);
  writeDishes(dishes);
  res.status(200).json({ message: "Dish deleted", deleted });
});


app.get('/dishes/get', (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ message: "Name query parameter required" });

  const dishes = readDishes();
  const matched = dishes.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));

  if (matched.length === 0) {
    return res.status(404).json({ message: "No dishes found" });
  }

  res.status(200).json(matched);
});


app.use('*', (req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
