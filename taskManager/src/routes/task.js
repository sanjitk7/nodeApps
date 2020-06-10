const express = require("express")
const Task = require("../models/tasks")
const auth = require("../middleware/auth")

const router = new express.Router()

router.post("/tasks",auth, async(req,res)=>{
    const newTask = new Task({
        ...req.body,
        owner: req.user._id
    })
    
    try {
        await newTask.save()
        res.status(201).send(newTask)
    } catch (e) {
        res.status(400).send()
    }
})

router.get("/tasks", auth, async (req,res) => {

    try {
        const allTasks = await Task.find({owner: req.user._id})
        // await req.user.populate("tasks").execPopulate()
        if (!allTasks){
            return res.status(404).send()
        }
        res.send(allTasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get("/tasks/:id",auth, async (req,res) => {
    const _id = req.params.id

    try {
        // const foundTask = await Task.findById(_id)
        const foundTask = await Task.findOne( { _id,owner:req.user._id } )
        if (!foundTask){
            return res.status(404).send()
        }
        res.send(foundTask)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch("/tasks/:id", auth, async (req,res) => {
    const updateFieldsReq = Object.keys(req.body)
    const validFields = ["description", "completed"]
    const isValidateFields = updateFieldsReq.every( (field) => validFields.includes(field))

    if (!isValidateFields){
        return res.status(400).send({ "error":"Invalid Update Requested"})
    }

    try{
        const foundTask = await Task.findOne({_id: req.params.id, owner: req.user._id})
        updateFieldsReq.forEach((updateField) => foundTask[updateField] = req.body[updateField])

        // const updatedTask = await Task.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true})
        if (!foundTask){
            return res.status(404).send()
        }
                
        await foundTask.save()
        res.send(foundTask)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete("/tasks/:id", auth, async (req,res) => {
    try {
        const deletedTask = await Task.findOneAndDelete({_id:req.params.id, owner: req.user._id})
        if (!deletedTask){
            return res.status(404).send()
        }
        res.send(deletedTask)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router