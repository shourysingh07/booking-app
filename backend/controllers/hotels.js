
const hotelDB=require("../model/hotels")
const rooomDB=require("../model/room")

module.exports= createHotel=async(req,res,next)=>{
    const newHotel=new hotelDB(req.body);
    try {
        const savedHotel=await newHotel.save();
        res.status(200).json({message:"Hotel saved successfully",savedHotel})
        
    } catch (error) {
        next(error)
    }
}
module.exports=updateHotel=async(req,res,next)=>{
    
    try {
        const updatedHotel=await hotelDB.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
        res.status(200).json({message:"Hotel updated successfully",updatedHotel})
        
    } catch (error) {
        next(error)
    }
}
module.exports=deleteHotel=async (req,res,next)=>{
    try {
        const hotelData=await hotelDB.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({message:"Hotel deleted-",hotelData})
    } catch (error) {
        next(error)
    }
}
module.exports=getHotel=async(req,res,next)=>{
    
    try {
        const hotelData=await hotelDB.findById({_id:req.params.id})
        res.status(200).json({message:"Hotel information-",hotelData})

        
    } catch (error) {
        next(error)
    }
}
module.exports=getAllHotel=async(req,res,next)=>{
    const{min,max,limit,...other}=req.query
    try {
        const hotelData=await hotelDB.find({
            ...other,
            cheapestPrice:{$gte:min||0,$lte:max||100000}
        }).limit(limit)
        res.status(200).json({message:"Hotel information-",hotelData})

        
    } catch (error) {
        next(error)
    }
}
module.exports=getAllHotelByCity=async(req,res,next)=>{
    const cities=req.query.cities.split(',')
    try {
        const list=await Promise.all(cities.map((e)=>{
            return hotelDB.countDocuments({city:e})
        }))
        res.status(200).json(list)
        
    } catch (error) {
        next(error)
    }
}
module.exports=getAllHotelByType=async(req,res,next)=>{
    // const types=req.query.types.split(',')
    try {
        const hotelCount=await hotelDB.countDocuments({type:"hotel"})
        const apartmentCount=await hotelDB.countDocuments({type:"apartment"})
        const resortCount=await hotelDB.countDocuments({type:"resort"})
        const villaCount=await hotelDB.countDocuments({type:"villa"})
        const cabinCount=await hotelDB.countDocuments({type:"cabin"})
        const list=[
            {type:"Hotels",count:hotelCount},
            {type:"Apartments",count:apartmentCount},
            {type:"Resorts",count:resortCount},
            {type:"Villas",count:villaCount},
            {type:"Cabins",count:cabinCount}
    ]
      
        res.status(200).json(list)

        
    } catch (error) {
        next(error)
    }
}
module.exports=getHotelRoom=async(req,res,next)=>{
    try {
        const hotel=await hotelDB.findById(req.params.id)
        const list=await Promise.all(hotel.rooms.map((e)=>{
            return(rooomDB.findById(e))
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}