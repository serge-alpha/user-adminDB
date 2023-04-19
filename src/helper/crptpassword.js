const bcrypt = require('bcrypt');
const salt = 10;

const EncryptPassword=async(password)=>{
    try {
       return await  bcrypt.hashSync(password, salt);
    } catch (error) {
         console.log(error)
    }
    
}

const comaparePassword=async(password,hashPassword)=>{
    try {
        return await  bcrypt.compare(password,hashPassword);
     } catch (error) {
          console.log(error)
     }
}

module.exports={EncryptPassword,comaparePassword};