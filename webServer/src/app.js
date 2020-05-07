const path = require("path")
const express = require("express")

const app = express()

const pathPublic = path.join(__dirname,"../public")

app.use(express.static(pathPublic))

// app.get('/about',(req,res) => {
//     res.send("<h1>About</h1>")
// })

// app.get('/weather',(req, res) => {
//     res.send([
//         {
//         location: "Erode",
//         weatherDes: "Cloudy"
//     },
//         {
//             location: "Vellore",
//             weatherDes: "Hot Blazing Sun"
//     }])
// })

app.listen(3000)