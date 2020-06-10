const express = require("express")
const User = require("../models/users")
const auth = require("../middleware/auth")
const router = new express.Router()

router.post("/users", async (req,res) => {
    const newUser = new User(req.body)
    try{
        await newUser.save()
        token = await newUser.generateToken()

        res.status(201).send({newUser,token})
        console.log("S")
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post("/users/login", async (req,res) => {
    try{
        // console.log("befoe")
        const userFound = await User.findByCredentials(req.body.email, req.body.password)
        // console.log(userFound)
        const token = await userFound.generateToken()
        // console.log(token)
        res.send({userFound,token})

    } catch (e) {
        res.status(400).send(e)
    }
})


router.post("/users/logout", auth, async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token!==req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post("/users/logoutAll", auth, async (req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
        
    } catch (e){
        res.status(500).send()
    }
})

router.get("/users/me", auth, async (req,res) => {
    res.send(req.user)
    
})



router.patch("/users/me",auth, async (req,res) => {
    const updateFieldsReq = Object.keys(req.body)


    const validFields = ["name", "email", "age","password"]
    const isValidateFields = updateFieldsReq.every((field) => validFields.includes(field)) // automaticly returns based on ES6
    
    if (!isValidateFields){
        return res.status(400).send({ "error" : "Invalid Update Requested!"})
    }
    try {
        updateFieldsReq.forEach((updateField) => req.user[updateField] = req.body[updateField])
        await req.user.save()
        // const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators: true })
        res.send(req.user)
    } catch (e) {
        send.status(400).send(e)
    }
})

router.delete("/users/me", auth, async (req,res) => {
    try {
        await req.user.remove()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router