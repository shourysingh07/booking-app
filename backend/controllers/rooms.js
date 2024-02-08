const roomDB=require("../model/room")
const hotelDB=require("../model/hotels")
const Room=require("../model/hotels")
const createError=require("../utils/errorHandler")

module.exports=createRoom=async(req,res,next)=>{
    const hotelId=req.params.hotelId
    const newRoom=new roomDB(req.body)
    try {
        const savedRoom=await newRoom.save()
        try {
            await hotelDB.findByIdAndUpdate({_id:hotelId},{$push:{rooms:savedRoom._id}},{new:true})
            res.status(200).json({message:"Room Created",savedRoom})
        } catch (error) {
            next(error)
        }
    } catch (error) {
        next(error)
    }

}
module.exports=updateRoom=async(req,res,next)=>{
    
    try {
        const updatedRoom=await roomDB.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
        res.status(200).json({message:"Room updated successfully",updatedRoom})
        
    } catch (error) {
        next(error)
    }
}
module.exports=updateRoomAvailablity=async(req,res,next)=>{
    
    try {
       await Room.updateOne({"roomNumber._id":req.params.id},{
        $push:{
            "roomNumbers.$.availableDates":req.body.date
        }               
       })
        
    } catch (error) {
        next(error)
    }
}
module.exports=deleteRoom=async (req,res,next)=>{ 
    try {
        const hotelId=req.params.hotelId
        const RoomData=await roomDB.findByIdAndDelete({_id:req.params.id})
        try {
         const hotelupdate=   await hotelDB.findByIdAndUpdate({_id:hotelId},{$pull:{rooms:req.params.id}},{new:true})
         res.status(200).json({message:"Room deleted",hotelupdate})
        } catch (error) {
            next(error)
        }
        
    } catch (error) {
        next(error)
    }
}
module.exports=getRoom=async(req,res,next)=>{
    
    try {
        const RoomData=await roomDB.findById({_id:req.params.id})
        res.status(200).json({message:"Room information-",RoomData})

        
    } catch (error) {
        next(error)
    }
}
module.exports=getAllRoom=async(req,res,next)=>{
    
    try {
        const Room=await roomDB.find()
        res.status(200).json({message:"Room information-",Room})

        
    } catch (error) {
        next(error)
    }
}