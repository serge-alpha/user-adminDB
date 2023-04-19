const router =require('express').Router();
const formidable=require('express-formidable');

const { createUser, verifyEmail, loginUser, logoutUser } = require('../controller/user');



router.post('/register',formidable(),createUser);
router.post('/verify',verifyEmail);
router.post('/login',loginUser);
router.post('/logout',logoutUser);

module.exports=router;