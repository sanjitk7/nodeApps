const request = require("postman-request")

const forecast = (lat,long,callback) => {
    urlForecast = "http://api.weatherstack.com/current?access_key=502e394f15c4aca52d029f854b02a262&query=" + lat + "," + long + "&units=f"
    request({url: urlForecast, json: true}, (error, response) => {
        if (error){
            callback(error, undefined)
        }
        else if (response.body.error){
            callback(response.body.error,undefined)
        }
        else{
            callback(undefined, {
                weatherDes: response.body.current.weather_descriptions[0],
                temp: response.body.current.temperature,
                precip: response.body.current.precip
            })
        }
    })
}

module.exports = forecast