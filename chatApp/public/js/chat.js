socket = io()

socket.on("message",(message)=> {
    console.log(message)
})

$messageForm = document.querySelector("#message-form")
$inputForm = $messageForm.querySelector("input")
$submitBtn = $messageForm.querySelector("#sendMessage")
$locationBtn = document.querySelector("#sendLocation")


$messageForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    $submitBtn.setAttribute("disabled","disabled")

    message = e.target.elements.message.value
    socket.emit("sendMessage",message, (error)=>{
        $submitBtn.removeAttribute("disabled")
        $inputForm.value = ""
        $inputForm.focus()

        if (error){
            return console.log(error)
        }
        console.log("Message delivered!")
    })
})


$locationBtn.addEventListener("click",()=>{

    if (!navigator.geolocation){
        return alert("Location is not supported by your browser!")
    }
    $locationBtn.setAttribute("diabled","disabled")

    navigator.geolocation.getCurrentPosition((position)=>{
        const locationObject = {
            lattitude:position.coords.latitude,
            longitude:position.coords.longitude
        }
        
        socket.emit("sendLocation",locationObject, ()=>{
            console.log("Location shared!")
            $locationBtn.removeAttribute("disabled")
        })
    })
})