const express = require('express')
const router = express.Router()
const HttpError = require('../../helper/Error/Error')
const userSchema = require('../../models/Users/UserSchema')
const postSchema = require('../../models/Posts/postSchema')
const fileUpload = require('../../helper/FileUpload/FileUpload')


router.post('/',fileUpload.single('img'),async(req,res,next)=>{

    const {userId,desc} = req.body;

    let findUser;

    try{
        findUser = await userSchema.findById(userId)

    }catch(err){
        const errors = new HttpError('find user failed',500)
        return next(errors)
    }
    if(!findUser){
        const errors = new HttpError('You cannt create post without signin',500)
        return next(errors)
    }

   

   const createPost = new postSchema({
    userId,
    desc,
    img:req.file.path
   })

   let result
    try{
      result =  await createPost.save()

    }catch(err){
        const errors = new HttpError('create user failed',500)
        return next(errors)
    }
    res.status(200).json({post:result})

   

})

module.exports = router