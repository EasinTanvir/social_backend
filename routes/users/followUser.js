const express = require('express')
const router = express.Router()
const HttpError = require('../../helper/Error/Error')
const userSchema = require('../../models/Users/UserSchema')

router.put('/:id',async(req,res,next)=>{

    const params = req.params.id;

    if(req.body.userId !== params){

        try{
            const user = await userSchema.findById(params)
            const currentUser = await userSchema.findById(req.body.userId)

            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{followings:params}})
                res.status(200).json("user has been followed")

            }else{
                const errors = new HttpError('You already follow that user',500)
               return next(errors)
            }

        }catch(err){
            const errors = new HttpError('follow user failed',500)
        return next(errors)
        }

    }else{
        const errors = new HttpError('You cannt follow yourself',423)
        return next(errors)
        
    }


})

module.exports = router