const Tasks = require("../models/tasks");
const Teams = require("../models/teams");
const User = require("../models/user");

exports.createTask = async (req, res) => {
    try {
        const team = await Teams.findById(req.params.id);
        const Loginuser = await User.findById(req.user);
        const { title, email, status, ending, priority } = req.body;

        const assignTo = await User.findOne({ email });

        if (!assignTo) {
            res.status(400).json({
                sucess: false,
                err: "Member you are assiging is not in the team"
            })
        }
        // checking wether the member we are adding is member of team or not
        else if (team.members.includes(assignTo.id)) {

            const task = await Tasks.create({
                title, assign_to: assignTo.id, assign_by: Loginuser.id,
                teams: team.id, status, ending, priority
            })
            team.task.push(task.id)
            await team.save()
            res.status(200).json({
                sucess: true,
                task
            })

        }
        else {
            res.status(400).json({
                sucess: false,
                err: "Member you are assiging is not in the team"
            })
        }

    } catch (err) {
        res.status(500).json({
            sucess: false,
            err: err.message
        })
    }
}

exports.removeTask = async (req, res) => {
    try {


        const task = await Tasks.findById(req.params.id);
        const id = task.teams
        const team = await Teams.findById(id)

        if (task.assign_by != req.user.id) {
            res.status(400).json({
                sucess: false,
                err: "You are not authorize"
            })
        } else {
            team.task.pull(task.id)
            await team.save()
            await task.deleteOne();
            res.status(200).json({
                sucess: true,
                msg: "Task Removed"
            })
        }
    } catch (err) {
        res.status(500).json({
            sucess: false,
            err: err.message
        })
    }
}


exports.fetchTask = async (req, res) => {
    try {

        const team = await Teams.findById(req.params.id)
        if (!team) {
            res.status(400).json({
                sucess: false,
                err: "Team not exist "
            })
        }
        else if (team.members.includes(req.user.id)) {
            const task = await Tasks.find({ _id: { $in: team.task } }).populate("assign_to assign_by")
            res.status(200).json({
                sucess: true,
                task
            })

        } else {
            res.status(400).json({
                sucess: false,
                err: "You are not a member or this team "
            })
        }
    } catch (err) {
        res.status(500).json({
            sucess: false,
            err: err.message
        })
    }
}

exports.changeStatus = async (req, res) => {
    try {
        const task = await Tasks.findById(req.params.id);
        const status = req.body.status;
        if (task.assign_to == req.user.id || task.assign_by == req.user.id) {
            task.status = status;
            await task.save();

            res.status(200).json({
                sucess: true,
                task
            })
        }

        else {
            res.status(400).json({
                sucess: false,
                err: "You can not update the status"
            })
        }
    } catch (err) {
        res.status(500).json({
            sucess: false,
            err: err.message
        })
    }
}