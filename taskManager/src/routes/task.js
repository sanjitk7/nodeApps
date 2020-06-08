const express = require("express")
const Task = require("../models/tasks")

const router = new express.Router()

router.post("/tasks",(req,res)=>{
    const newTask = new Task(req.body)
    newTask.save().then(()=>{
        res.status(201).send("TaskCreated!"+newTask)
    }).catch(e=>{
        res.status(400).send(e)
    })
})

router.get("/tasks", async (req,res) => {

    try {
        const allTasks = await Task.find({})
        if (!allTasks){
            return res.status(404).send()
        }
        res.send(allTasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get("/tasks/:id", async (req,res) => {
    const _id = req.params.id
    try {
        const foundTask = await Task.findById(_id)
        if (!foundTask){
            return res.status(404).send()
        }
        res.send(foundTask)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch("/tasks/:id",async (req,res) => {
    const updateFieldsReq = Object.keys(req.body)
    const validFields = ["description", "completed"]
    const isValidateFields = updateFieldsReq.every( (field) => validFields.includes(field))

    if (!isValidateFields){
        return res.status(400).send({ "error":"Invalid Update Requested"})
    }

    try{
        const foundTask = await Task.findById(req.params.id)
        updateFieldsReq.forEach((updateField) => foundTask[updateField] = req.body[updateField])
        await foundTask.save()
        const updatedTask = foundTask
        // const updatedTask = await Task.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true})
        if (!updatedTask){
            return res.status(404).send()
        }
        res.send(updatedTask)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete("/tasks/:id", async (req,res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id)
        if (!deletedTask){
            return res.status(404).send()
        }
        res.send(deletedTask)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router