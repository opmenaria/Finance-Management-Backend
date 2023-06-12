const {getAllTaxes, createTax, updateTax, deleteTax} = require('../controllers/tax');
const router = require('express').Router();
const { verifyUser } = require('../middleware/verifyToken')

router.get('/', verifyUser, getAllTaxes);
router.post('/', verifyUser, createTax);
router.put('/:id', verifyUser, updateTax);
router.delete('/:id', verifyUser, deleteTax);

module.exports = router;
