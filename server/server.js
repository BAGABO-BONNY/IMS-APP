const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;
app.use(cors());

mongoose.connect('mongodb://localhost:27017/customers', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const goodsSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Goods = mongoose.model('Goods', goodsSchema);

app.use(bodyParser.json());


app.post('/goods', async (req, res) => {
 try {
  const { name, description, price } = req.body;
  const newGoods = new Goods({
    name: name,
    description: description,
    price: price
  });
  await newGoods.save()
  console.log('Goods saved successfully');
   return res.status(200).send('Goods saved successfully');
 } catch (error) {
  console.error('Error saving goods:', error);
      res.status(500).send('Error saving goods');
 }
});


app.get('/allGoods',async(req,res) => {
  try {
    const goods = await Goods.find()
    res.status(200).json(goods)
  } catch (error) {
    console.error('Error getting goods:', error);
      res.status(500).send('Error getting goods'); 
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
