const User = require("../model/user");

const createUser=async(req,res)=>{
    try {
        
        // const newUser= new User({
        //     name:req.body.name,
        //     email:req.body.email,
        //     phone:req.body.phone,
        // });
        // await newUser.save();
        res.status(200).json({message:"user created",body:req.body.email});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

module.exports={createUser};