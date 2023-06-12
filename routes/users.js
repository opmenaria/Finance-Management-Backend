const {getAllUsers,createUser, updateUser, deleteUser} = require('../controllers/user');
const { verifyUser } = require('../middleware/verifyToken')
const router = require('express').Router();


router.get('/',verifyUser , getAllUsers);
router.put('/:id',verifyUser , updateUser);
router.delete('/:id',verifyUser , deleteUser);

module.exports = router;
