const { EncryptPassword } = require("../helper/crptpassword");
const { Token } = require("../helper/store_data_temp");
const User = require("../model/user");

const createUser=async(req,res)=>{
    try {
        const{name,email,phone,password}=req.fields;
        const{image}=req.files;
        

        if(!name|!email|!password){
            return res.status(404).json({message:"Email, name or password not found"})
        }
        if(image && image.size>1000000){
            return res.status(404).json({message:"image size must be less than 1mb"})
        }

        const isExist= await User.findOne({email:email});

        if(!isExist){
            return res.status(400).json({message:"user with this email already exist"});
        }
        const hashPassword=await EncryptPassword(password);
        const token=await Token({name,email,hashPassword,phone,image});

        
        // const newUser= new User({
        //     name:req.fields.name,
        //     email:req.fields.email,
        //     phone:req.fields.phone,
        // });
        
        // // const user=await newUser.save();
        res.status(200).json({message:"user created",hashedpassword:hashPassword,token:token});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

module.exports={createUser};