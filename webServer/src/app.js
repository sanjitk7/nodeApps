const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const path = require("path")
const express = require("express")
const hbs = require("hbs")

const app = express()

//set up paths
const pathPublic = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//set up hbs as templating engine and location
app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(pathPublic))

//set up dynamic rendering using hbs templating engine
app.get("", (req,res) => {
    res.render("index",{
        title: "Weather",
        creator: "Sanjit Kumar"
    })
})

app.get("/about", (req,res) => {
    res.render("about",{
        title: "About",
        creator: "Sanjit Kumar"
    })
})

app.get("/help", (req,res) => {
    res.render("help",{
        title: "Help",
        creator: "Sanjit Kumar",
        message: "This is a placeholder for a message. Lorem ipsum."
    })
})

app.get("/weather",(req,res) => {
    
    const userDefLocation = req.query.address
    if (!userDefLocation){
        return res.send({
            error: "Address Must Be Provided"
        })
    }

    geocode(userDefLocation, (error, {lattitude, longitude, location} = {} )=> {
        if (error){
            return res.send("Geocode Error! ",error)
        }
        forecast(longitude,lattitude, (forecastError, forecastData) => {
            if (forecastError){
                return res.send('Forecast Error! ', forecastError)
            }
            res.send({
                forecast: forecastData,
                location,
                address: userDefLocation
                
            })

          })
    })
    
})

app.get("/help/*", (req,res) => {
    res.render("404", {
        errorMessage: "HELP ARTICLE",
        creator: "Sanjit",
        title:"Error 404"
    })
})

app.get("*", (req,res) => {
    res.render("404",{
        errorMessage: "PAGE",
        creator: "Sanjit",
        title:"Error 404"
    })
})

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})