const {getAllSavings,createSavings, updateSavings, deleteSavings} = require('../controllers/saving');
const router = require('express').Router();
const { verifyUser } = require('../middleware/verifyToken')

router.get('/', verifyUser, getAllSavings);
router.post('/', verifyUser, createSavings);
router.put('/:id', verifyUser, updateSavings);
router.delete('/:id', verifyUser, deleteSavings);

module.exports = router;
