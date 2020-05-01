// console.log("start")

// setTimeout(() => {
//     console.log("Print this after a sec")
// },1000)

// console.log("stop")

const request = require("postman-request")

const url = "http://api.weatherstack.com/current?access_key=502e394f15c4aca52d029f854b02a262&query=11.350250,77.743276&units=f"

request({url: url, json:true}, (error,response) => {
    if (error){
        console.log("Unable to connect to weather service") // check low level (local machine lvl) errors like internet connectivity
    } else if (response.body.error){
        console.log("Error: " + response.body.error.code + " " + response.body.error.info) //check api query level errors like missing coordinates etc
    }
    else{

        console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " farenheight out. There is " + response.body.current.precip + "% chance of rain.")
    }

})

//Geocoding
//Address -> Lat/Long -> Weather

const urlGeocoding = "https://api.mapbox.com/geocoding/v5/mapbox.places/Erode.json?access_token=pk.eyJ1Ijoic2Fuaml0NzciLCJhIjoiY2s5b2FtNHFiMGF0ODNnbWU2bnVuNHNoNSJ9.8caqd9hdR0bPEO0j9HGQeg&limit=1"

request({url:urlGeocoding, json:true},(error, response) => {
    if (error){
        console.log("Unnable to connect to the location service") //check low level errors
    } else if (response.body.features.length === 0){
        console.log("No such location found")
    }
    else {
    const coordinates = response.body.features[0].geometry.coordinates
    const latitude  = coordinates[0]
    const longitude = coordinates[1]
    console.log("Your coordinates: " , latitude,longitude)
    }
})