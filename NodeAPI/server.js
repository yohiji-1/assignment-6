const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

let menu = [
  { id: 1, name: 'Burger', price: 5.99, category: 'Fast Food' },
  { id: 2, name: 'Pizza', price: 8.5, category: 'Fast Food' },
  { id: 3, name: 'Salad', price: 4.75, category: 'Healthy' }
];

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Simple Menu Node API',
    endpoints: {
      getAll: 'GET /menu',
      getOne: 'GET /menu/:id',
      add: 'POST /menu',
      update: 'PUT /menu/:id',
      delete: 'DELETE /menu/:id'
    }
  });
});

app.get('/menu', (req, res) => {
  res.status(200).json(menu);
});

app.get('/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = menu.find(m => m.id === id);

  if (!item) {
    return res.status(404).json({ message: 'Menu item not found' });
  }

  res.status(200).json(item);
});

app.post('/menu', (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ message: 'Name, price, and category are required' });
  }

  const newItem = {
    id: menu.length ? menu[menu.length - 1].id + 1 : 1,
    name,
    price,
    category
  };

  menu.push(newItem);
  res.status(201).json({
    message: 'Menu item added successfully',
    item: newItem
  });
});

app.put('/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = menu.find(m => m.id === id);

  if (!item) {
    return res.status(404).json({ message: 'Menu item not found' });
  }

  const { name, price, category } = req.body;

  if (name) item.name = name;
  if (price) item.price = price;
  if (category) item.category = category;

  res.status(200).json({
    message: 'Menu item updated successfully',
    item
  });
});

app.delete('/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = menu.findIndex(m => m.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Menu item not found' });
  }

  const deletedItem = menu[index];
  menu.splice(index, 1);

  res.status(200).json({
    message: 'Menu item deleted successfully',
    item: deletedItem
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});