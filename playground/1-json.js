const fs = require("fs")
// const book = {
//     title: 'The Subtle Art of not giving a fuck',
//     author: 'Mark Manson'
// }

// bookJSON = JSON.stringify(book)
// console.log(bookJSON)

// fs.writeFileSync("sample.json",bookJSON)

// jsObject = JSON.parse(bookJSON)
// console.log(jsObject)

// const dataBuffer = fs.readFileSync("sample.json")
// const dataJSON = dataBuffer.toString()
// const dataJS = JSON.parse(dataJSON)
// console.log(dataJS.author)

dataBuffer = fs.readFileSync("sample.json")
const dataJSON = dataBuffer.toString()
const dataJS = JSON.parse(dataJSON)
dataJS.name = "Sanjit"
dataJS.age = 19
changedJSON = JSON.stringify(dataJS)
fs.writeFileSync("sample.json",changedJSON)