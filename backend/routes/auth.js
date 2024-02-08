const express=require("express")
const router=express.Router()
require("../controllers/auth")

router.get('/',(req,res)=>{
    res.send("Auth endpoint")

})
router.post('/register',register)
router.post('/login/',login)


module.exports=router
