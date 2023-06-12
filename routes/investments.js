const router = require('express').Router();
const { getInvestment,getAllInvestments, createInvestment, updateInvestment, deleteInvestment} = require('../controllers/investment');
const { verifyUser } = require('../middleware/verifyToken')
router.get('/:id', verifyUser, getInvestment);
router.get('/', verifyUser, getAllInvestments);
router.post('/', verifyUser, createInvestment);
router.put('/:id', verifyUser, updateInvestment);
router.delete('/:id', verifyUser, deleteInvestment);

module.exports = router;
