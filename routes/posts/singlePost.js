const express = require('express')
const router = express.Router()
const HttpError = require('../../helper/Error/Error')
const postSchema = require('../../models/Posts/postSchema')

router.get('/:id',async(req,res,next)=>{

    const params = req.params.id;


    let singlePost ;

    try{

        singlePost = await postSchema.findById(params)


    
    }catch(err){
      const errors = new HttpError('fetch single post failed',500)
            return next(errors)
    }

    res.status(201).json({post:singlePost})

   

})

module.exports = router