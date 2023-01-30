const express = require('express')
const router = express.Router()
const HttpError = require('../../helper/Error/Error')
const postSchema = require('../../models/Posts/postSchema')

router.delete('/:id',async(req,res,next)=>{

    const params = req.params.id;

    let deletePost
    try{
        deletePost = await postSchema.findById(params)

    }catch(err){
        const errors = new HttpError('fetch post failed',500)
        return next(errors)
    }
    
  if(deletePost.userId === req.body.userId){
    try{
        await deletePost.remove()
   
      }catch(err){
       const errors = new HttpError(' fetch post gailed to delete post',500)
       return next(errors)
      }
  }

   res.status(201).json({message:'post delete successfully'})


   

})

module.exports = router