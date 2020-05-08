console.log("Client Side JS")


const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#messageOne")
const messageTwo = document.querySelector("#messageTwo")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    messageOne.textContent = "Loading..."
    messageTwo.innerHTML = ""


    const location = search.value
    url = "http://localhost:3000/weather?address=" + location
    fetch(url).then((response) => {
 
        response.json().then((weatherData) => {
            console.log(weatherData)
            if (weatherData.error){
                // console.log("Error: ",weatherData.error)
                messageOne.textContent = "Error: " + weatherData.error
                messageTwo.innerHTML = ""

            } else{
                messageOne.innerHTML = "<strong>Location:</strong> " + weatherData.location
                messageTwo.innerHTML = "<strong>Forecast:</strong> " + weatherData.forecast
            }
        })
    })
})