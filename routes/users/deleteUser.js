const express = require('express')
const router = express.Router()
const HttpError = require('../../helper/Error/Error')
const userSchema = require('../../models/Users/UserSchema')

router.delete('/:id',async(req,res,next)=>{

    const params = req.params.id;

   if(req.body.userId ===params){
   

    try{
        await userSchema.findByIdAndDelete(params)

    }catch(err){
        const errors = new HttpError('Fetch user failed',423)
        return next(errors)
    }


   
    

    res.status(200).json({message:'Delete user successfully'})
   }else{
    const errors = new HttpError('you can delete only your account',423)
    return next(errors)
   }

})

module.exports = router