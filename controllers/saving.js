const Savings = require('../models/saving');

exports.getAllSavings = async (req, res) => {
  try {
    const userId = req.user.id;
    const savings = await Savings.find({userId});
    res.json(savings);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

exports.createSavings = async (req, res) => {
  const { type, amount, description } = req.body;
  const userId = req.user.id;
  try {
    const savings = new Savings({
      type,
      amount,
      description,
      userId
    });

    const newSavings = await savings.save();
    res.status(201).json({message: "Savings create successfully",
    savings: newSavings});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSavings = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, type } = req.body;
    const userId = req.user.id;
    const savings = await Savings.findOne({ _id: id, userId });
    if (!savings) {
      return res.status(404).json({ message: 'Savings not found' });
    }
    savings.type = type;
    savings.amount = amount;
    savings.description = description;
    

    const updatedSavings = await savings.save();
    res.json(updatedSavings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSavings = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const savings = await Savings.findOne({ _id: id, userId });
    if (!savings) {
      return res.status(404).json({ message: 'Savings not found' });
    }

    await savings.deleteOne();
    res.json({ message: 'Savings deleted successfully' });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};
