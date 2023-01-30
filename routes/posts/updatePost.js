const express = require('express')
const router = express.Router()
const HttpError = require('../../helper/Error/Error')
const postSchema = require('../../models/Posts/postSchema')

router.put('/:id',async(req,res,next)=>{

    const params = req.params.id;

    let findPost;
   try{
     findPost = await postSchema.findById(params)

    if(findPost.userId ===req.body.userId){

       findPost.desc = req.body.desc;


       let result;
       try{
        result = await findPost.save()

       }catch(err){
        const errors = new HttpError('post update failed',500)
        return next(errors)
       }
       
res.status(200).json({update:result})

    }else{
        const errors = new HttpError('you are not owner of that post',500)
    return next(errors)
    }

   }catch(err){
    const errors = new HttpError('update user failed',500)
    return next(errors)
   }


   

})

module.exports = router