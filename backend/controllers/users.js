const UserDB=require("../model/user")

module.exports=updateUser=async(req,res,next)=>{
    
    try {
        const updatedUser=await UserDB.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
        res.status(200).json({message:"User updated successfully",updatedUser})
        
    } catch (error) {
        next(error)
    }
}
module.exports=deleteUser=async (req,res,next)=>{
    try {
        const UserData=await UserDB.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({message:"User deleted-",UserData})
    } catch (error) {
        next(error)
    }
}
module.exports=getUser=async(req,res,next)=>{
    
    try {
        const UserData=await UserDB.findById({_id:req.params.id})
        res.status(200).json({message:"User information-",UserData})

        
    } catch (error) {
        next(error)
    }
}
module.exports=getAllUser=async(req,res,next)=>{
    
    try {
        const UserData=await UserDB.find()
        res.status(200).json({message:"User information-",UserData})

        
    } catch (error) {
        next(error)
    }
}