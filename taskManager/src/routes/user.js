const express = require("express")
const User = require("../models/users")
const router = new express.Router()

router.post("/users", async (req,res) => {
    const newUser = new User(req.body)
    try{
        await newUser.save()
        res.status(201).send("User Created!"+newUser)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get("/users", async (req,res) => {
    try {
        const foundUsers = await User.find({})
        if (!foundUsers){
            return res.status(404).send()
        }
        res.send(foundUsers)
    } catch (e) {
        res.status(500).send()
    }
    
})

router.get("/users/:id", async (req,res) => {
    const _id = req.params.id
    try {
        const foundUser = await User.findById(_id)
        if (!foundUser){
            return res.status(404).send()
        }
        res.send(foundUser)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch("/users/:id", async (req,res) => {
    const updateFieldsReq = Object.keys(req.body)
    const validFields = ["name", "email", "age","password"]
    const isValidateFields = updateFieldsReq.every((field) => validFields.includes(field)) // automaticly returns based on ES6
    
    if (!isValidateFields){
        return res.status(400).send({ "error" : "Invalid Update Requested!"})
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators: true })
        if (!updatedUser) {
            res.status(404).send()
        }
        res.send(updatedUser)
    } catch (e) {
        send.status(400).send(e)
    }
})

router.delete("/users/:id", async (req,res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if (!deletedUser){
            return res.status(404).send()
        }
        res.send(deletedUser)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router