const express=require("express")
const router=express.Router()

require("../utils/verifyToken")

require("../controllers/rooms")

router.post('/:hotelId',verifyAdmin,createRoom)


//update
router.put('/:id',verifyAdmin,updateRoom)
router.put('/availablity/:id',updateRoomAvailablity)
//delete
router.delete("/:id/:hotelId",verifyAdmin,deleteRoom)
//get
router.get('/:id',getRoom)
//get all
router.get('/',getAllRoom)

module.exports=router