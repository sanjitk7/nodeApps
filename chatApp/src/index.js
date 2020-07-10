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
    console.log("New Socket Connection")
    socket.emit("countUpdated",count)
    socket.on("increment", ()=>{
        count+=1
        // socket.emit("countUpdated",count)
        io.emit("countUpdated",count)
    })
})

server.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})

