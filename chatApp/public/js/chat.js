socket = io()

socket.on("countUpdated", (count)=> {
    console.log("count was updated",count)
})

document.querySelector("#countIncrement").addEventListener("click",()=>{
    console.log("increment from client")
    socket.emit("increment")
})