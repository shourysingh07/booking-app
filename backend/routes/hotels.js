const express=require("express")
const router=express.Router()
require("../utils/verifyToken")

require("../controllers/hotels")
//create
router.post('/',verifyAdmin,createHotel)


//update
router.put('/find/:id',verifyAdmin,updateHotel) 
//delete
router.delete("/find/:id",verifyAdmin,deleteHotel)
//get
router.get('/find/:id',getHotel)
//get all
router.get('/',getAllHotel)
//get all hotels by city
router.get('/countByCity',getAllHotelByCity)
//get all hotels by type
router.get('/countByType',getAllHotelByType)
router.get('/room/:id',getHotelRoom)




module.exports=router