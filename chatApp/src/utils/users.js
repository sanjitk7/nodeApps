const users = []

// addUser, getUser, removeUser, getUsersInRoom

const addUser = ( id, displayname, room)=>{
    // Clean data
    displayname = displayname.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate data
    if (!displayname || !room ){
        return {
            error: "Displayname and Room are mandatory"
        }
    }

    // check for existing users
    const existingUser = users.find((user)=>{
        return room=== user.room && user.displayname === displayname 
    })

    // validate displayname
    if(existingUser){
        return {
            error: "the display name is already in use in this chatroom"
        }
    }

    // store user
    user = {id, displayname, room}
    users.push(user)
    return { user }
}

const removeUser = (id)=>{
    const index = users.findIndex((user)=>{
        return user.id===id
    })

    if(!index){
        return {
            error:"no such user"
        }
    }

    if (index!=-1){
        return users.splice(index,1)[0]
    }
}

const getUser = (id)=>{
    const foundUser = users.find((user)=>{
        return user.id === id
    })

    return foundUser
}

const getUsersInRoom = (room)=>{
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}