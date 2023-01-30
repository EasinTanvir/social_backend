const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const HttpError = require('../../helper/Error/Error')
const userSchema = require('../../models/Users/UserSchema')
const postSchema = require('../../models/Posts/postSchema')



router.get('/:username',async(req,res,next)=>{

    const params = req.params.username;

    let post;
    try{

        const user = await userSchema.findOne({username:params})
        if(!user){
            const errors = new HttpError('No user found',423)
            return next(errors)
        }
        post = await postSchema.find({userId:user.id})

    }catch(err){
        const errors = new HttpError('Fetch user Failed',423)
        return next(errors)
    }

    res.status(200).json(post)

   

})

module.exports = router