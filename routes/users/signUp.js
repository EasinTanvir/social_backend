const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const HttpError = require('../../helper/Error/Error')
const userSchema = require('../../models/Users/UserSchema')


router.post('/',async(req,res,next)=>{

    const {username,email,password} = req.body;

    let existingUser;

    try{
        existingUser = await userSchema.findOne({username:username})

    }catch(err){
        const errors = new HttpError('Something went wrong',500)
        return next(errors)
    }

    if(existingUser){
        const errors = new HttpError('Sorry username already taken',423)
        return next(errors)
    }


    let existingEmail;

    try{
        existingEmail = await userSchema.findOne({email:email})

    }catch(err){
        const errors = new HttpError('Something went wrong',500)
        return next(errors)
    }

    if(existingEmail){
        const errors = new HttpError('Sorry Email already taken',423)
        return next(errors)
    }

   

    let hashPass;

    try{
        hashPass = await bcrypt.hash(password,12)

    }catch(err){
        const errors = new HttpError('Password Bcrypt Failed',423)
        return next(errors)
    }

    const createUser = new userSchema({

        username,
        email,
        password:hashPass

    })

    let newUser;

    try{
        newUser = await createUser.save()


    }catch(err){
        const errors = new HttpError('Create User Failed',423)
        return next(errors)
    }

    res.status(201).json({user:newUser})

})

module.exports = router