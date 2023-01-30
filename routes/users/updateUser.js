const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs")
const HttpError = require('../../helper/Error/Error')
const userSchema = require('../../models/Users/UserSchema')

router.patch('/:id',async(req,res,next)=>{


const params = req.params.id;


if(req.body.userId ===params){
    

  if(req.body.password){
    try{
        req.body.password = await bcrypt.hash(req.body.password,12)

    }catch(err){
        const errors = new HttpError('password hashed failed',500)
        return next(errors)
    }
  }


let updateUser;

try{
    updateUser = await userSchema.findByIdAndUpdate(params,{
        $set:req.body
    })

}catch(err){
    const errors = new HttpError('fetch user failed',500)
    return next(errors)
}


let result;
try{
   result = await updateUser.save()

}catch(err){
    const errors = new HttpError('Update user failed',500)
    return next(errors)
}

res.status(201).json({update:result})


}else{
    const errors = new HttpError('not authonicated',500)
    return next(errors)
}







   


})

module.exports = router