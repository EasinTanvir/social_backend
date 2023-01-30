const express = require('express')
const router = express.Router()
const HttpError = require('../../helper/Error/Error')
const postSchema = require('../../models/Posts/postSchema')

router.put('/:id/like',async(req,res,next)=>{

    const params = req.params.id;

    let post;
   try{
     post = await postSchema.findById(params)  

    if(!post.likes.includes(req.body.userId)){
      try{

        
        await post.updateOne({$push:{likes:req.body.userId}})
      }catch(err){
        const errors = new HttpError('post liked failed',500)
        return next(errors)
      }
        res.status(201).json({message:" You liked that post!"})

    }else{

        try{

            await post.updateOne({$pull:{likes:req.body.userId}})
        }catch(err){
            const errors = new HttpError('post disliked failed',500)
            return next(errors)
        }

    res.status(201).json({message:"You disliked that post!"})
    }

      
   

   }catch(err){
    const errors = new HttpError('update user failed',500)
    return next(errors)
   }


   

})

module.exports = router