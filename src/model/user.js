const {Schema,model}=require('mongoose');

const userSchema= new Schema({
    name:{
        type: String,
        required:true,
        minlenght:2
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true
    }
})

const User= model('User',userSchema);

module.exports=User;