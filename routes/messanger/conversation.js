const express = require('express')
const router = express.Router()
const HttpError = require('../../helper/Error/Error')
const conversationSchema = require('../../models/Converasation/Conversation')


//new conversation

router.post('/',async(req,res,next)=>{


   

    
    const newConver = new conversationSchema({

        members:[req.body.senderId,req.body.recId]

    })

    let con;

    try{

    con = await newConver.save()
    }catch(err){
        const errors = new HttpError('create conversation failed',500)
        return next(errors)
    }

    res.status(200).json({conversation:con})
})


//get conversation
router.get('/:id',async(req,res,next)=>{
    const param = req.params.id

    try{

        const conversation = await conversationSchema.find({members:{ $in:[param] }})
        res.status(200).json({conversation:conversation})
    }catch(err){
        const errors = new HttpError('get conversation failed',500)
        return next(errors)
    }

})

module.exports = router