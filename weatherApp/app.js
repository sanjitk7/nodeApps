const request = require("postman-request")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

geocode("Erode", (error, data)=> {
    if (error){
        return console.log("Geocode Error! ",error)
    }
    forecast(data.longitude, data.lattitude, (forecastError, forecastData) => {
        if (forecastError){
            return console.log('Forecast Error! ', forecastError)
        }
        console.log(data.location)
        console.log(forecastData)
      })
})