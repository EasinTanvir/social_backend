const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const HttpError = require('../../helper/Error/Error')
const userSchema = require('../../models/Users/UserSchema')


router.post('/',async(req,res,next)=>{

    const {email,password} = req.body;

    let auth;

    try{
        auth =await userSchema.findOne({email:email})

    }catch(err){
        const errors = new HttpError('Something went wrong',500)
        return next(errors)
    }

    if(!auth){
        const errors = new HttpError('No user Found',500)
        return next(errors)
    }

    let hashPass;

    try{
        hashPass = await bcrypt.compare(password,auth.password)

    }catch(err){
        const errors = new HttpError('Something went wrong',500)
        return next(errors)
    }

    if(!hashPass){
        const errors = new HttpError('Invalid Password',500)
        return next(errors)
    }

    res.status(201).json({login : auth})

})

module.exports = router