const userDB=require("../model/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const createError=require("../utils/errorHandler")
module.exports=register=async(req,res,next)=>{
try {
    
    const salt=await bcrypt.genSalt(10)
    req.body.password=await bcrypt.hash(req.body.password,salt)
    const newUser=new userDB(req.body)
    const savedUser=await newUser.save()
    res.status(200).json({message:"New user saved successfully",savedUser})
} catch (error) {
    next(error)
}
}
module.exports=login=async(req,res,next)=>{
    
        try {
            
            const userFound=await userDB.findOne({username:req.body.username})
            if(!userFound) return next(createError(404,"User not found"))
            const isPasswordCorrect=await bcrypt.compare(req.body.password,userFound.password)
            if(!isPasswordCorrect) return next(createError(400,"Wrong password"))
            const token=jwt.sign({id:userFound._id,isAdmin:userFound.isAdmin},process.env.JWTSECRET)
            const{password,isAdmin,...otherDetails}=userFound._doc
            res.cookie("access_token",token,{
                httpOnly:true
            }).status(200).json({message:"User found",otherDetails,isAdmin})
        } catch (error) {
            next(error) 
        }

   
}