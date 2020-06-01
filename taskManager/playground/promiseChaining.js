require("../src/db/mongoose")
const User = require("../src/models/users")

User.findByIdAndUpdate("5ed511b575a7bb72c06a39c0", { age: 30 }).then(updatedUser => {
    console.log("User was updated:",updatedUser)
    return User.countDocuments({ age: 30 })
}).then(count => {
    console.log("Count: ",count)
})