const request = require("postman-request")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

// const url = "http://api.weatherstack.com/current?access_key=502e394f15c4aca52d029f854b02a262&query=11.350250,77.743276&units=f"

// request({url: url, json:true}, (error,response) => {
//     if (error){
//         console.log("Unable to connect to weather service") // check low level (local machine lvl) errors like internet connectivity
//     } else if (response.body.error){
//         console.log("Error: " + response.body.error.code + " " + response.body.error.info) //check api query level errors like missing coordinates etc
//     }
//     else{

//         console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " farenheight out. There is " + response.body.current.precip + "% chance of rain.")
//     }

// })

//Geocoding
//Address -> Lat/Long -> Weather


// geocode("Erode", (error, data)=> {
//     if (error){
//         console.log("Error! ",error)
//     }
//     else{
//         console.log("Your location ",data)
//     }
// })

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)



forecast(77.73333,11.35, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })