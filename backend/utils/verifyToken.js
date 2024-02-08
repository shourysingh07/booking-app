const jwt=require("jsonwebtoken")
const createError=require("../utils/errorHandler")
const e = require("express")
const errorHandled = require("../utils/errorHandler")

module.exports=verifyToken=(req,res,next)=>
{
    const token=req.cookies.access_token
    if(!token) return next(createError(401,"You are not logged in"))

    jwt.verify(token,process.env.JWTSECRET,(err,userFound)=>{
        if(err) return next(createError(403,"Not a valid token"))
        req.user=userFound
        next()
    })
}
module.exports=verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id||req.user.isAdmin)
        {
            next();
        }
        else
        {
            return(next(errorHandled(403,"You are not authorized")));
        }
    })
}
module.exports=verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next ,()=>{
        if(req.user.isAdmin)
        {
            next();
        }
        else
        {
            return(next(errorHandled(403,"You are not authorized")));
        }
    })
}