const router =require('express').Router();
const formidable=require('express-formidable');
const session=require('express-session');

const { createUser, verifyEmail, loginUser, logoutUser, userProfile } = require('../controller/user');
const dev = require('../config');
const { isLogin, isLogOut } = require('../middleware/user_auth');



router.use(session({
    name:'user_session',
  secret:dev.app.secret_sess_key,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge:10*6000}
}))


router.post('/register',formidable(),createUser);
router.post('/verify',verifyEmail);
router.post('/login',isLogOut,loginUser);
router.get('/',isLogin,userProfile);
router.post('/logout',logoutUser);

module.exports=router;