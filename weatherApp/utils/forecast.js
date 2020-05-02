const request = require("postman-request")

const forecast = (lat,long,callback) => {
    urlForecast = "http://api.weatherstack.com/current?access_key=502e394f15c4aca52d029f854b02a262&query=" + lat + "," + long + "&units=f"
    request({url: urlForecast, json: true}, (error, response) => {
        if (error){
            callback("Unable to connect to forecast service. Sry please try again later.", undefined)
        }
        else if (response.body.error){
            callback("Unable to find location.",undefined)
        }
        else{
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " farenheight out. There is " + response.body.current.precip + "% chance of rain.")
        }
    })
}

module.exports = forecast