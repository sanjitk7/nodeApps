const fs = require("fs")
const chalk = require("chalk")

const getNote = () => {
    return "Your notes..."
}

//utilities
const addNote = (title,body) => {
    const notes = loadNote()
    const duplicateNotes = notes.find( (note) => title === note.title)

    debugger

    if (!duplicateNotes){
        notes.push({
            title:title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green("Successfully Added Note!"))
    }
    else{
        console.log(chalk.yellow("Duplicate Note Found! Note addition Failed."))
    }
    
}

const removeNote = (title) => {
    const notes = loadNote()
    const notesToKeep = notes.filter( (note) => title !== note.title)
    if (notesToKeep.length!==notes.length){
        saveNotes(notesToKeep)
        console.log(chalk.green("Successfully deleted your note!"))
    }
    else{
        console.log(chalk.red("The note does't exist. Please try again with a valid title"))
    }
}

const listNote = () => {
    console.log(chalk.blue("These are the existing notes:"))
    notes = loadNote()
    notes.forEach(element => {
        console.log(element.title)
    });
}

const readNote = (title) => {
    notes = loadNote()
    const noteToRead = notes.find(note => title === note.title)
    if (noteToRead){
        console.log(chalk.blue("Title: " + noteToRead.title))
        console.log(noteToRead.body)
    }
    else{
        console.log(chalk.red("Note not found!"))
    }
}

const saveNotes = (notes) => {
    dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json",dataJSON)
}

const loadNote = () => {
    try{
        dataBuffer = fs.readFileSync("notes.json")
        dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e){
        return []
    }
    
}


module.exports = {
    getNote: getNote,
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}