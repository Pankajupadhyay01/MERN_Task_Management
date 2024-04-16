const mongoose = require('mongoose');

const task = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter Task Title"]
    },
    assign_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    assign_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    teams: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    },
    status: {
        type: String,
        required: [true, "Enter Task Status"]
    },
    starting: {
        type: Date,
        default: Date.now
    },
    ending: {
        type: Date,
        required: [true, "Enter Task Ending Date"]
    },
    priority: {
        type: String,
        required: [true, "Enter Task Priority"]
    },

})

module.exports = mongoose.model("tasks", task)