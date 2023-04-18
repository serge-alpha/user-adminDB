const router =require('express').Router();
const formidable=require('express-formidable');

const { createUser } = require('../controller/user');



router.post('/register',formidable(),createUser);

module.exports=router;