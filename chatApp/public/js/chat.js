socket = io()

socket.on("message",(message)=> {
    console.log(message)
})

submitBtn = document.querySelector("#sendMessage")
messageForm = document.querySelector("#message-form")

messageForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    message = e.target.elements.message.value
    socket.emit("sendMessage",message)
})