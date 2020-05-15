// CRUD Create Remove Update Delete Operations

// const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient

const { MongoClient, ObjectID } = require("mongodb")

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "taskManager"

const id = new ObjectID()

MongoClient.connect(connectionURL,{ useNewUrlParser:true,useUnifiedTopology: true },(error, client) => {
    if (error){
        return console.log("Coudn't Connect!")
    }

    const db = client.db(databaseName)

    // db.collection("users").find({ Age: 30 }).toArray((error, users) => {
    //     if (error){
    //         return console.log("Error!")
    //     }
    //     console.log(users)
    // })

    db.collection("tasks").findOne({ _id: new ObjectID("5ebea15ae2e2e613fd300257")}, (error, task) => {
        if (error){
            return console.log("Error!")
        }
        console.log(task)

    } )

    db.collection("tasks").find({ completed:1 }).toArray((error,arr) => {
        if (error){
            return console.log("error")
        }
        console.log(arr)
    })

} )