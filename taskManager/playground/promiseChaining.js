require("../src/db/mongoose")
const User = require("../src/models/users")

// User.findByIdAndUpdate("5ed511b575a7bb72c06a39c0", { age: 30 }).then(updatedUser => {
//     console.log("User was updated:",updatedUser)
//     return User.countDocuments({ age: 30 })
// }).then(count => {
//     console.log("Count: ",count)
// })

const updateAndCount = async (id,age) => {
    const foundUser = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAndCount("5ecf82bc23ac3a777b77a5f0",20).then(res => {
    console.log("Count: ",res)
}).catch(e => {
    console.log(e)
})