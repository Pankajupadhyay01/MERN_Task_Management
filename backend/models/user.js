const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Enter Your Mail"],
        unique: [true, "Email Already Exist"],
    },
    password: {
        type: String,
        required: [true, 'Enter Your Password'],
        minlength: [6, 'Password Must Be At Least 6 Characters']
    },
    team: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team"
        }
    ]
})


user.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    } else {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
})

user.methods.comparePass = async function (pass) {
    return await bcrypt.compare(pass, this.password)
}

user.methods.token = async function () {
    return jwt.sign({ _id: this._id }, process.env.JWT)
}
module.exports = mongoose.model("User", user)