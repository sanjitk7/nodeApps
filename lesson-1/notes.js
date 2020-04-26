const fs = require("fs")

const getNote = function(){
    return "Your notes..."
}

//utilities
const addNote = function(title,body){
    const notes = loadNote()
    const duplicateNotes = notes.filter(function(note){
        return title == note.title
    })

    if (duplicateNotes.length == 0){
        notes.push({
            title:title,
            body: body
        })
        saveNotes(notes)
        console.log("Successfully Added Note!")
    }
    else{
        console.log("Duplicate Note Found! Note addition Failed.")
    }
    
}

const saveNotes = function(notes){
    dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json",dataJSON)
}

const loadNote = function(){
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
    addNote: addNote
}