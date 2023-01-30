const mongoose = require('mongoose')



const createUser = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:6},
    profilePicture:{type:String,default:""},
    coverPicture:{type:String,default:""},
    followers:{type:Array,default:[]},
    followings:{type:Array,default:[]},
    isAdmin:{type:Boolean,default:false},
    desc:{type:String,max:50},
    city:{type:String,max:50},
    from:{type:String,max:50},
    relationship:{type:Number,enum:[1,2,3]}
    
    
   

},
{timestamps:true}
)

createUser.set("toJSON",{getters:true})

module.exports = mongoose.model('user',createUser)