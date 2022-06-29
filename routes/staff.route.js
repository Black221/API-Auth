const router = require('express').Router();
const {
    getAllStaff,
    getOneStaff,
    updateStaff,
    deleteStaff,
    logout, updatePassword
} = require('../controllers/staff.controller');

router.get('/logout', logout)

router.get('/all', getAllStaff);
router.get('/specific/:id', getOneStaff);

router.delete('/delete/:id', deleteStaff);
router.patch('/update/:id', updateStaff);
router.put('/password/:id', updatePassword);

module.exports = router;