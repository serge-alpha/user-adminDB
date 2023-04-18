const bcrypt = require('bcrypt');
const salt = 10;

const EncryptPassword=async(password)=>{
    try {
       return await  bcrypt.hashSync(password, salt);
    } catch (error) {
         console.log(error)
    }
    
}

module.exports={EncryptPassword};