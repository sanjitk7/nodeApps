const request = require("postman-request")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const userDefLocation = process.argv[2]

if (!userDefLocation){
    console.log("Address not specified. Please provide an address.")
}
else{
    geocode(userDefLocation, (error, {lattitude, longitude, location} = {} )=> {
        if (error){
            return console.log("Geocode Error! ",error)
        }
        forecast(longitude,lattitude, (forecastError, forecastData) => {
            if (forecastError){
                return console.log('Forecast Error! ', forecastError)
            }
            console.log(location)
            console.log(forecastData)
          })
    })    
}