const mongoose = require('mongoose')


const Message = new mongoose.Schema({


   conversationId:{type:String},
   sender:{type:String},
   text:{type:String},

},
{timestamps:true}
)

Message.set("toJSON",{getters:true})


module.exports = mongoose.model('message',Message)