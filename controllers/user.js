const User = require('../models/user');


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createUser = async (req, res) => {
  const { username, password, email, phone, role } = req.body;

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const phoneRegex = /^(\+\d{1,2}\s?)?(\d{1,3}[\s.-]?)?(\(\d{1,3}\)\s?)?(\d{1,4}[\s.-]?){2,6}(\d{1,4})$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Invalid phone number format' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = new User({
      username,
      password,
      email,
      phone,
      role,
    });

    const newUser = await user.save();
    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email, phone ,role } = req.body;

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const phoneRegex = /^(\+\d{1,2}\s?)?(\d{1,3}[\s.-]?)?(\(\d{1,3}\)\s?)?(\d{1,4}[\s.-]?){2,6}(\d{1,4})$/;
    if (email && !emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }
    if (phone && !phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username;
    user.password = password;
    user.email = email;
    user.phone = phone;
    user.role = role;

    const updatedUser = await user.save();
    res.json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};