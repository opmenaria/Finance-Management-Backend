const { addIncome, getIncome, getIncomes, deleteIncome, updateIncome } = require('../controllers/income');
const { addExpense, getExpense, getExpenses, deleteExpense, updateExpense, getMonthlyExpenses} = require('../controllers/expense');
const router = require('express').Router();
const { verifyUser } = require('../middleware/verifyToken')

router.post('/add-income', verifyUser, addIncome)
    .get('/get-income/:id', verifyUser, getIncome)
    .get('/get-incomes', verifyUser, getIncomes)
    .get('/get-expenses/monthly', verifyUser, getMonthlyExpenses)
    .delete('/delete-income/:id', verifyUser, deleteIncome)
    .put('/update-income/:id', verifyUser, updateIncome)
    .post('/add-expense', verifyUser, addExpense)
    .get('/get-expense/:id', verifyUser, getExpense)
    .get('/get-expenses', verifyUser, getExpenses)
    .delete('/delete-expense/:id', verifyUser, deleteExpense)
    .put('/update-expense/:id', verifyUser, updateExpense)

module.exports = router