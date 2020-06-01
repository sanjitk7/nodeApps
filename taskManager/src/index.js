const express = require("express")
require("./db/mongoose")
const User = require("./models/users")
const Task = require("./models/tasks")

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.post("/users", (req,res) => {
    const newUser = new User(req.body)
    newUser.save().then(() => {
        res.status(201).send("User Created!"+newUser)
    }).catch(e => {
        res.status(400).send(e)
    })
})

app.get("/users",(req,res) => {
    User.find({}).then((users) => {
        if (!users){
            return res.status(404).send()
        }
        res.send(users)
    }).catch(e => {
        res.status(500).send()
    })
})

app.get("/users/:id",(req,res) => {
    const _id = req.params.id
    User.findById(_id).then(user => {
        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch(e => {
        res.status(500).send()
    })
})


app.post("/tasks",(req,res)=>{
    const newTask = new Task(req.body)
    newTask.save().then(()=>{
        res.status(201).send("TaskCreated!"+newTask)
    }).catch(e=>{
        res.status(400).send(e)
    })
})

app.get("/tasks",(req,res) => {
    Task.find({}).then(tasks => {
        if (!tasks){
            return res.status(404).send()
        }
        res.send(tasks)
    }).catch(e => {
        res.status(500).send()
    })
})

app.get("/tasks/:id", (req,res) => {
    const _id = req.params.id
    Task.findById(_id).then(task => {
        if (!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch(e => {
        res.status(500).send()
    })
})

app.listen(port,()=>{
    console.log("Server Up on port"+port)
})