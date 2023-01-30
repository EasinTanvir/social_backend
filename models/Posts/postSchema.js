const mongoose = require('mongoose')


const createPost = new mongoose.Schema({
   userId:{type:String,required:true},
   desc:{type:String,max:500},
   img:{type:String},
   likes:{type:Array,default:[]},
   
    
   

},
{timestamps:true}
)

createPost.set("toJSON",{getters:true})

module.exports = mongoose.model('posts',createPost)