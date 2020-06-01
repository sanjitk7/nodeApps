require("../src/db/mongoose")
const Task = require("../src/models/tasks")

Task.findByIdAndRemove("5ed0abf743b1c40e5f6d2b47").then((result) => {
    console.log("Deleted object! ",result)
    return Task.find({ completed:false })
}).then(incompleteTasks => {
    console.log("All Incomplete Tasks:\n",incompleteTasks)
}).catch(e => {
    console.log(e)
})