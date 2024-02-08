const express=require("express")
const port=5000||process.env.PORT
const app=express();
const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()
const authRoute=require("./routes/auth")
const hotelRoute=require("./routes/hotels")
const roomRoute=require("./routes/rooms")
const userRoute=require("./routes/users")
const cookieparsor=require("cookie-parser")
const cors=require("cors")

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB Successfully connected")
}).catch((e)=>{
    console.log("Error occured")
    console.log(e)
})


//middlewares
app.use(cors({
    origin:"http://localhost:3000"
}))//
app.use(cookieparsor())
app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/hotel",hotelRoute)
app.use("/api/room",roomRoute)
app.use("/api/user",userRoute)
app.use((err,req,res,next)=>{
    const errorStatus=err.status||500
    const errorMessage=err.message||"Something went wrong"
    res.status(errorStatus).json({
        "message":errorMessage,
        "success":false,
        "status":errorStatus
    })
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})