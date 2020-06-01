const validator = require("validator")
const mongoose = require("mongoose")

const User = mongoose.model("User", {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required:true,
        lowercase: true,
        trim:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },  
    age:{
        type:Number,
        default:0,
        validate(value){
            if (value<0){
                throw new Error("Age cannot be negetive")
            }
        }

    },
    password: {
        type: String,
        trim: true,
        minlength: 7,
        validate(value){
            if (value.includes("password")){
                throw new Error("Password cannot be 'password'")
            }
        }
    }

})

module.exports = User