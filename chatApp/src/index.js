const http = require("http")
const express = require("express")
const path = require("path")
const socketio = require("socket.io")

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
    socket.emit("message","Welcome")
    socket.on("sendMessage", (data)=> {
        io.emit("message",data)
    })
})

server.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})

