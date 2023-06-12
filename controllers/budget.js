const Budget = require('../models/budget');

// Get all budgets
exports.getAllBudgets = async (req, res) => {
  const userId = req.user.id;
  try {
    const budgets = await Budget.find({ userId });
    res.json(budgets);
  } catch (error) {
    res.status(422).json({ message: 'Somthing went wrong' });
  }
};

// Create a new budget
exports.createBudget = async (req, res) => {
  const { category, amount, startDate, endDate } = req.body;
  const userId = req.user.id;
  try {
    const budget = new Budget({
      category,
      amount,
      startDate,
      endDate,
      userId
    });

    const newBudget = await budget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update budget
exports.updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount, startDate, endDate } = req.body;
    const userId = req.user.id;
    const budget = await Budget.findOne({ _id: id, userId });
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    budget.category = category;
    budget.amount = amount;
    budget.startDate = startDate;
    budget.endDate = endDate;

    const updatedBudget = await budget.save();
    res.json(updatedBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete budget
exports.deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const budget = await Budget.findOne({ _id: id, userId });
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    await budget.deleteOne();
    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(422).json({ message: 'Something went wrong' });
  }
};
