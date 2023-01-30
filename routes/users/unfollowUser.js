const express = require('express')
const router = express.Router()
const HttpError = require('../../helper/Error/Error')
const userSchema = require('../../models/Users/UserSchema')

router.put('/:id',async(req,res,next)=>{

    const params = req.params.id;

    if(req.body.userId !== params){

        try{
            //searching user
            const user = await userSchema.findById(params)

            //me            
            const currentUser = await userSchema.findById(req.body.userId)

            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{followings:params}})
                res.status(200).json("User has been unfollowed")

            }else{
                const errors = new HttpError('You dont follow that user',500)
               return next(errors)
            }

        }catch(err){
            const errors = new HttpError('follow user failed',500)
        return next(errors)
        }

    }else{
        const errors = new HttpError('You cannt unfollow yourself',423)
        return next(errors)
        
    }


})

module.exports = router