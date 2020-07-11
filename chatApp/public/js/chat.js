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

locationBtn = document.querySelector("#sendLocation")
locationBtn.addEventListener("click",()=>{
    if (!navigator.geolocation){
        return alert("Location is not supported by your browser!")
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        const locationObject = {
            lattitude:position.coords.latitude,
            longitude:position.coords.longitude
        }

        socket.emit("sendLocation",locationObject)
    })
})