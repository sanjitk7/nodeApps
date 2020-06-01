const mongoose = require("mongoose")

const Task = mongoose.model("Task",{

    description: {
        type: String,
        required: true,
        trim:true
    },
    completed: {
        type: Boolean,
        required: false,
        default:0
    }
    
})

module.exports = Task