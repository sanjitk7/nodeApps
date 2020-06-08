const validator = require("validator")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
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

userSchema.pre("save", async function(next) {
    user = this
    // console.log("this prints before saving")

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    next()

})

const User = mongoose.model("User", userSchema)


module.exports = User