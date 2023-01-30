const express = require('express')
const router = express.Router()
const HttpError = require('../../helper/Error/Error')
const userSchema = require('../../models/Users/UserSchema')

router.get('/:id',async(req,res,next)=>{

    const params = req.params.id;

    try{
        const user = await userSchema.findById(params);
        const firends = await Promise.all(
            user.followings.map((id)=>(
                 userSchema.findById(id)
            ))
        )
        let firendList = []
        firends.map(firend=>{
            const {id,username,profilePicture} = firend
            firendList.push({id,username,profilePicture})
        })
        res.status(200).json({user:firendList})

    }catch(err){
        const errors = new HttpError('Fetch single user failed',423)
        return next(errors)
    }

   


})

module.exports = router