const express=require("express")
const router=express.Router()
require("../controllers/users")
require("../utils/verifyToken")
//update
router.put('/:id',verifyUser,updateUser)
//delete
router.delete("/:id",verifyUser,deleteUser) 
//get
router.get('/:id',verifyUser,getUser)
//get all
router.get('/',verifyAdmin,getAllUser)

 
module.exports=router