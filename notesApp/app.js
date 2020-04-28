const notes = require("./notes.js")

//const validator = require("validator")
//const chalk = require("chalk")
const yargs = require("yargs")

//Creating a custom version of yargs for a Notes App
yargs.version("1.1.0")

//Creating a Add,Remove,Read,List commands
yargs.command({
    command:"add",
    describe:"Add a Note",
    builder:{
        title:{
            describe:"Add note name",
            demandOption:true,
            type: "string"

        },
        body:{
            describe:"Add content to note",
            demandOption:true,
            type:"string"
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command:"remove",
    describe:"Remove a Note",
    builder:{
        title:{
            describe:"specify a note title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
        
    }
})

yargs.command({
    command:"list",
    describe:"List a Note",
    handler(){
        notes.listNote()
    }
})

yargs.command({
    command:"read",
    describe:"Read a Note",
    builder: {
        title:{
            describe:"specify note title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})


//highLight = chalk.green.bold.inverse
//console.log(highLight("Testing chalk! Im changing something to check nodemon"))

//console.log(validator.isURL("http//www.goo.com"))

// console.log(myNotes())

// console.log(add(2,3))npm i nodemon

//const command = process.argv[2]

// if (command == "add"){
//     console.log("Adding Note")
// } else if (command == "remove"){
//     console.log("removing note")
// }

//console.log(process.argv)
//console.log(yargs.argv)
yargs.parse()