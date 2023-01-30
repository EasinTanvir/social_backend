const express = require('express')
const router = express.Router()
const HttpError = require('../../helper/Error/Error')
const postSchema = require('../../models/Posts/postSchema')
const userSchema = require('../../models/Users/UserSchema')

router.get('/timeline/:id',async(req,res,next)=>{

   try{
    const currentUser = await userSchema.findById(req.params.id)
    const  currentUserPost = await postSchema.find({userId:currentUser.id})
    const firendPost = await Promise.all(
        currentUser.followings.map((friendId)=>{
          return  postSchema.find({userId:friendId})
   })
    )
    res.json(currentUserPost.concat(...firendPost))

   }catch(err){
    const errors = new HttpError('freind post fetch failed',500)
    return next(errors)
   }



   

})

module.exports = router