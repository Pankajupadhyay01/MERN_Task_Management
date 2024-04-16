const mongoose = require("mongoose")

const teams = new mongoose.Schema({
    team_name: {
        type: String,
        required: [true, "please enter team name "]
    },
    admin: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    task: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "task"
        }
    ],
})

module.exports = mongoose.model("Team", teams)