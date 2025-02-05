const mongoose = require("mongoose")
const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
       
    },
    desc:{
        type:String,
        required:true,
    },
    important:{
        type:Boolean,
        default:false,
    },
    completed:{
        type:Boolean,
        default:false,
        },

   
});

module.exports = mongoose.model("task",TaskSchema);