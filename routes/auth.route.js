const router = require('express').Router();
const {
    staffRegister,
    login, isAuth
} = require("../controllers/auth.controller");


router.post('/register', staffRegister);
router.post('/login', login);
router.get('/isauth', isAuth);


module.exports = router;