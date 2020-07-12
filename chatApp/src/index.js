const {generateMessage,generateLocation} = require("./utils/messages")
const {addUser,removeUser,getUser,getUsersInRoom} = require("./utils/users")
const http = require("http")
const express = require("express")
const path = require("path")
const socketio = require("socket.io")
const Filter = require("bad-words")
const users = require("./utils/users")

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

    socket.on("join",({displayname, room},callback)=>{
        
        const {error, user} = addUser(socket.id,displayname,room)

        if(error){
            return callback(error)
        }


        socket.join(user.room)

        socket.emit("message",generateMessage("Welcome!","Admin"))
        socket.broadcast.to(user.room).emit("message",generateMessage(`${user.displayname} has joined!`,user.displayname))
        io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()
    })

    socket.on("sendMessage", (data, callback)=> {
        
        const user = getUser(socket.id)
        const filter = new Filter()
        if (filter.isProfane(data)){
            return callback("Profanity is not allowed!")
        }

        console.log(user)
        io.to(user.room).emit("message",generateMessage(data,user.displayname))

        callback()
    })

    socket.on("sendLocation", (position,callback)=>{
        const user = getUser(socket.id)
        io.to(user.room).emit("locationMessage",generateLocation(`https://www.google.com/maps?q=${position.lattitude},${position.longitude}`,user.displayname))
        callback()
    })

    socket.on("disconnect",()=>{
        const user = removeUser(socket.id)
        if (user){
            io.to(user.room).emit("message",generateMessage(`${user.displayname} has left!`,user.displayname))
            io.to(user.room).emit("roomData",{
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})

server.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})

