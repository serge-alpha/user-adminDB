const {connect}=require('mongoose');
const dev = require('.');

const connectDB=()=>{
    try {
        connect(dev.db.url);
        console.log("DB connected")
    } catch (error) {
        console.log(error)    
    }
}

module.exports=connectDB