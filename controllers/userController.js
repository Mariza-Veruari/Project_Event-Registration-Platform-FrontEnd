const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorHandler = require('../middleware/error');

 exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'User',
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

 
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const token = jwt.sign({ userId: user._id, email: user.email }, '12345abc', {
    expiresIn: '24h',
  });

  res.status(200).json({ token, user });
};

exports.getAll = async (req, res) => {
  const users = await User.find().lean();
  res.status(200).json(users);
};

exports.delete = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId);
  res.status(200).json(user);
};
