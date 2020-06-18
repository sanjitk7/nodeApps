const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const User = require("../../src/models/users")
const Task = require("../../src/models/tasks")

const userOneId = new mongoose.Types.ObjectId()
const userTwoId = new mongoose.Types.ObjectId()
const taskOneId = new mongoose.Types.ObjectId()
const taskTwoId = new mongoose.Types.ObjectId()
const taskThreeId = new mongoose.Types.ObjectId()
const userOne = {
    _id:userOneId,
    name: "test user",
    email: "test2@example.com",
    password: "Hello12344",
    tokens:[{
        token:jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
}

const userTwo = {
    _id:userTwoId,
    name: "test user",
    email: "test3@example.com",
    password: "Hello12344",
    tokens:[{
        token:jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description:"Radnom Text1",
    completed:false,
    owner: userOne._id
}

const taskTwo = {
    _id: taskTwoId,
    description:"Radnom Text2",
    completed:false,
    owner: userOne._id
}

const taskThree = {
    _id: taskThreeId,
    description:"Radnom Text3",
    completed:true,
    owner: userTwo._id
}
const setupdb = async ()=>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    setupdb,
    taskThree
}