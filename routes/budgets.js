const router = require('express').Router();
const { getAllBudgets ,createBudget, updateBudget, deleteBudget} = require('../controllers/budget');
const { verifyUser } = require('../middleware/verifyToken')

router.get('/', verifyUser, getAllBudgets);
router.post('/', verifyUser, createBudget);
router.put('/:id', verifyUser, updateBudget);
router.delete('/:id', verifyUser, deleteBudget);

module.exports = router;
