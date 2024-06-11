// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create Express app
const app = express();
const PORT = 5000;
const JWT_SECRET = 'ANotherSecretKeyForJWT$123'
;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/goodsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});
const User = mongoose.model('User', userSchema);

// Logbook Entry Schema and Model
const logbookEntrySchema = new mongoose.Schema({
  entryDate: { type: Date, required: true },
  entryTime: { type: Date, required: true },
  days: { type: String, required: true },
  week: { type: String, required: true },
  activityDescription: { type: String, required: true },
  workingHour: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});
const LogbookEntry = mongoose.model('LogbookEntry', logbookEntrySchema);

// Inventory Schema and Model
const inventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});
const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

// Auth Routes
app.post('/auth/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering new user');
  }
});

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('User not found');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      const token = jwt.sign({ username: user.username, id: user._id },ANotherSecretKeyForJWT$123
        );
      res.status(200).json({ token });
    } else {
      res.status(401).send('Invalid password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Inventory Routes
app.get('/inventory', authenticateToken, async (req, res) => {
  try {
    const inventoryItems = await InventoryItem.find();
    res.json(inventoryItems);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching inventory items');
  }
});

app.post('/inventory', authenticateToken, async (req, res) => {
  const { name, description, quantity, price } = req.body;
  try {
    const newItem = new InventoryItem({ name, description, quantity, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating inventory item');
  }
});

app.put('/inventory/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, description, quantity, price } = req.body;
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(id, { name, description, quantity, price }, { new: true });
    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating inventory item');
  }
});

app.delete('/inventory/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await InventoryItem.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting inventory item');
  }
});

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).send('Unauthorized');

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Forbidden');
    req.user = user;
    next();
  });
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
