const express = require('express')
const router = express.Router()
const HttpError = require('../../helper/Error/Error')
const userSchema = require('../../models/Users/UserSchema')

router.get('/',async(req,res,next)=>{

    const userId = req.query.userId;
    const username = req.query.username

    let singleUser;

    try{
        singleUser =userId? await userSchema.findById(userId):await userSchema.findOne({username:username})
        const {password, updatedAt,...others} = singleUser._doc;
        res.status(201).json({user :others})
    }catch(err){
        const errors = new HttpError('Fetch single user failed',423)
        return next(errors)
    }


    

})

module.exports = router