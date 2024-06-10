const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

exports.register = async (req, res) => {
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
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('User not found');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      const token = jwt.sign({ username: user.username, id: user._id }, 'x&@3H!uZC8LbNp$^sWp#EzTq7gYt5Hk');
      
      res.status(200).json({ token });
    } else {
      res.status(401).send('Invalid password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
