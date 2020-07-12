socket = io()

// DOM Variables
$messageForm = document.querySelector("#message-form")
$inputForm = $messageForm.querySelector("input")
$submitBtn = $messageForm.querySelector("#sendMessage")
$locationBtn = document.querySelector("#sendLocation")
$messages = document.querySelector("#messages")
$sideBar = document.querySelector("#chatSidebar")

// Mustache templates
messageTemplate = document.querySelector("#messageTemplate").innerHTML
locationTemplate = document.querySelector("#locationTemplate").innerHTML
roomDataTemplate = document.querySelector("#roomDataTemplate").innerHTML

// Options
const {displayname, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})

const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

socket.on("message",(message)=> {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format("hh:mm a"),
        displayname: message.displayname
    })
    $messages.insertAdjacentHTML("beforeend",html)
    console.log(message)

    autoscroll()
})

socket.on("locationMessage",(locationURL)=>{
    const html = Mustache.render(locationTemplate, {
        locationURL:location.location,
        createdAt: moment(location.createdAt).format("hh:mm a"),
        displayname:locationURL.displayname
    })
    $messages.insertAdjacentHTML("beforeend",html)
    // console.log(locationURL)

    autoscroll()
})

socket.on("roomData", ({room,users})=>{
    const html = Mustache.render(roomDataTemplate, {
        room,
        users
    })
    $sideBar.innerHTML = html

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

socket.emit("join", {displayname, room}, (error)=> {
    if (error){
        alert(error)
        location.href = "/"
    }
})