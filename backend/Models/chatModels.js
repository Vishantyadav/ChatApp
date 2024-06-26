const mongoose = require('mongoose')

const chatModels = mongoose.Schema({
    chatName:{type:string, trim:true},
    isGroupChat:{type:Boolean, default:false},
    
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },

    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
    
},
{
    Timestamps:ture,
})

const Chat = mongoose.model("Chat",chatModels)

modulele.exports = Chat;