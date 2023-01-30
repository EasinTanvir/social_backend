const mongoose = require('mongoose')


const Conversation = new mongoose.Schema({


    members:{type:Array}  

},
{timestamps:true}
)
Conversation.set("toJSON",{getters:true})



module.exports = mongoose.model('conversation',Conversation)