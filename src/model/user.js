const {Schema,model}=require('mongoose');

const userSchema= new Schema({
    name:{
        type: String,
        required:[true,'name is required'],
        minlenght:2,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:[true,"email is required"],
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:[true ,"password is required"],
        min:6
    },
    image:{
        type:Buffer,
        contentType:String
    }
})

const User= model('User',userSchema);

module.exports=User;