const http = require("http")

const url = urlForecast = "http://api.weatherstack.com/current?access_key=502e394f15c4aca52d029f854b02a262&query=10,0&units=f"

const request = http.request(url, (response) => {
    
    let data = ""

    response.on("data", (chunk)=> {
        data = data + chunk.toString()
    });

    response.on("end",()=>{
        const forecastData = JSON.parse(data)
        console.log(forecastData)
    });
});

request.on("error", (error)=>{
    console.log("Error! ",error)
});

request.end()