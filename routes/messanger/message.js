const express = require('express')
const router = express.Router()
const messageSchema = require('../../models/Message/Message')



//add
router.post('/',async(req,res,next)=>{

    const newMessage = new messageSchema(req.body)


    try{
        const saveMsg = await newMessage.save()
        res.status(200).json({message:saveMsg})

    }catch(err){
        const errors = new HttpError('create message failed',500)
        return next(errors)
    }

})


//get
router.get('/:conid',async(req,res,next)=>{
    const params = req.params.conid
    try{
     const allmessages = await messageSchema.find({
        conversationId:params
     })
     res.status(200).json({messages:allmessages})


    }catch(err){
        const errors = new HttpError('get message failed',500)
        return next(errors)
    }

})

module.exports = router