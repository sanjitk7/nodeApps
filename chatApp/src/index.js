const {generateMessage,generateLocation} = require("./utils/messages")
const http = require("http")
const express = require("express")
const path = require("path")
const socketio = require("socket.io")
const Filter = require("bad-words")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 4000

// Paths
publicPath = path.join(__dirname,"../public")

app.use(express.static(publicPath))

let count = 0

// server emits -> "countUpdated" -> client
// client emits -> "increment" -> server

io.on("connection", (socket)=>{
    socket.emit("message",generateMessage("Welcome!"))
    socket.broadcast.emit("message",generateMessage("A new user has joined!"))

    socket.on("sendMessage", (data, callback)=> {
        
        const filter = new Filter()
        if (filter.isProfane(data)){
            return callback("Profanity is not allowed!")
        }
        
        io.emit("message",generateMessage(data))

        callback()
    })

    socket.on("sendLocation", (position,callback)=>{
        io.emit("locationMessage",generateLocation(`https://www.google.com/maps?q=${position.lattitude},${position.longitude}`))
        callback()
    })

    socket.on("disconnect",()=>{
        io.emit("message",generateMessage("A user has left!"))
    })
})

server.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})

