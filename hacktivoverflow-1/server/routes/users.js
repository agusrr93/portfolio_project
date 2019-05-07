const express = require('express');
const router = express.Router();
const {register, login, update, getUser, loginGoogle, verification} = require('../controllers/users')
const {isLogin, googleCheck} = require('../middlewares/auth')

router.post('/', register)
router.get('/', isLogin, getUser)
router.post('/login', login)
router.post('/loginGoogle', googleCheck, loginGoogle)
router.get('/verification/:id', verification)
// router.get('/', getUser)
// router.put('/:id', update)

module.exports = router;