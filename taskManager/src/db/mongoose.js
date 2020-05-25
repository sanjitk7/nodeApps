const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1/tasks-mongoose",{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true
})

const User = mongoose.model("User", {
    name: {
        type: String
    },
    age:{
        type:Number
    }

})

const Task = mongoose.model("Task",{

    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
    
})

const BoilEggs = new Task({
    description: "Boil the chicken eggs for dinner",
    completed: false
})

BoilEggs.save().then(task => console.log("Boil Eggs Saved :",task)).catch(err => console.log("Error"))