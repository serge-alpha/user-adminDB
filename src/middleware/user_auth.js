const isLogin=(req,res,next)=>{
    try {
        if(req.session.userId){
            next();
        }else{
            return res.status(404).json({message:"Please login"})
        }
    } catch (error) {
        res.status(500).json({message:"Something is wrong"});
    }
}

const isLogOut=(req,res,next)=>{
    try {
        if(req.session.userId){
          return res.status(404).json({message:"Please logout"}) 
          }  
          next();                    
       
    } catch (error) {
        res.status(500).json({message:"Something is wrong"});
    }
}
module.exports={isLogin,isLogOut}