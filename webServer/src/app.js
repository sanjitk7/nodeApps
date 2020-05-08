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
        title: "Home",
        creator: "Sanjit Kumar"
    })
})

app.get("/about", (req,res) => {
    res.render("about",{
        title: "About the Application",
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