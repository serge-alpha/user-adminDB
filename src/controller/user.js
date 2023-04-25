const jwt=require('jsonwebtoken');
const fs=require('fs');


const dev = require("../config");
const { EncryptPassword, comaparePassword } = require("../helper/crptpassword");
const sendMail = require("../helper/email");
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

        if(isExist){
            return res.status(400).json({message:"user with this email already exist"});
        }
        const hashPassword=await EncryptPassword(password);
        const token=await Token({name,email,hashPassword,phone,image});

        //create email to be sent

        const emailData={
            email,
            subject:"Verify your email",
            html:`<h1>Click here to verify your email</h1>
            <p>Click here to<a href="${dev.app.clientUrl}/auth/activte/${token} target="_blank">activate your account</a></p>`,
        }

        sendMail(emailData);
        
        
        res.status(200).json({message:"user created",hashedpassword:hashPassword,token:token});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

const verifyEmail= async(req,res)=>{
    try { 
        const {token}=req.body;
        if(!token){
            return res.status(404).json({message:"token is missen"})
        }
        jwt.verify(token, dev.app.privateKey, async(err, decoded)=> {
            if (err){
              return res.status(401).json({message:"token has expired"})
            }
               const {name,email,hashPassword,phone,image}=decoded;
               console.log(decoded)
              const isExist= await User.findOne({email:email});
             if(isExist){
                 return res.status(400).json({message:"user with this email already exist"});
             }
             const newUser= new User({
                name:name,
                email:email,
                phone:phone,
                password:hashPassword,
                is_verified:true
            });

            if(image){
                newUser.image.data=fs.readFileSync(image.path);
                newUser.image.contentType=image.type;
            }
            
            const user=await newUser.save();
           await res.status(200).json({message:'User verified', userData:user})
            });
          
       
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body; 
        if(!email||!password){
            return res.status(404).json({message:"Email or password not found"})
        }
        const user= await User.findOne({email:email});
        if(!user){
            return res.status(400).json({message:"No user with this email"});
        }
        const passWordMatch=await comaparePassword(password,user.password);
        
        if(!passWordMatch){
            return res.status(400).json({message:"Name or password is wrong"})
        }
        // creating session for login user
         req.session.userId=user.id
        console.log(req.session);
        res.status(200).json({
           
            message:"Login successful",
            user:{
                name:user.name,
                image:user.image,
                phone:user.phone
            }
         })
         console.log(req.session)
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
    }
}

const userProfile=(req,res)=>{
    try {

        res.status(200).json({message:'user logged in'})
    } catch (error) {
        res.status(500).json({message:"somthing went wrong"})
    }
}

const logoutUser=(req,res)=>{
    try {
        req.session.destroy();
        res.clearCookie("user_session")
        res.status(200).json({message:"Logout succesful"})        

    } catch (error) {
        res.status(500).json({message:"Something went wrong"})  
    }
}



module.exports={createUser,verifyEmail,loginUser,logoutUser,userProfile};