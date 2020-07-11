socket = io()

// DOM Variables
$messageForm = document.querySelector("#message-form")
$inputForm = $messageForm.querySelector("input")
$submitBtn = $messageForm.querySelector("#sendMessage")
$locationBtn = document.querySelector("#sendLocation")
$messages = document.querySelector("#messages")

// Mustache templates
messageTemplate = document.querySelector("#messageTemplate").innerHTML
locationTemplate = document.querySelector("#locationTemplate").innerHTML


socket.on("message",(message)=> {
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format("hh:mm a")
    })
    $messages.insertAdjacentHTML("beforeend",html)
    console.log(message)
})

socket.on("locationMessage",(locationURL)=>{
    const html = Mustache.render(locationTemplate, {
        locationURL:location.location,
        createdAt: moment(location.createdAt).format("hh:mm a")
    })
    $messages.insertAdjacentHTML("beforeend",html)
    console.log(locationURL)
})

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