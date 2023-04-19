const jwt=require('jsonwebtoken');
const dev = require('../config');



  const Token=async(userData)=>{
        try {
           return await jwt.sign(userData, dev.app.privateKey,{expiresIn:"10m"});
        } catch (error) {
            console.log(error)
        }
  }

 
    
  module.exports={Token};