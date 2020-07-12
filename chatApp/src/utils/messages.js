const generateMessage = (text,displayname)=>{
    return {
        text,
        createdAt: new Date().getTime(),
        displayname
    }
}

const generateLocation = (location,displayname)=>{
    return {
        location,
        createdAt: new Date().getTime(),
        displayname
    }
}

module.exports = {
    generateMessage,
    generateLocation
}