const Teams = require("../models/teams")
const User = require("../models/user")

exports.createTeam = async (req, res) => {
    try {
        const { team_name } = req.body
        const team = await Teams.create({ team_name })
        const user = await User.findById(req.user.id)
        user.team.push(team._id);
        team.members.push(user.id);
        team.admin.push(user.id);
        await team.save();
        await user.save();
        res.status(200).json({
            success: true,
            msg: "Team Created",
            team
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            err: error.message,
        })
    }
}


// fetching all the team 
exports.getTeams = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const teams = await Teams.find({ _id: { $in: user.team } })
        res.status(200).json({
            success: true,
            teams
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            err: err.message
        })
    }
}

// adding member to the team  
exports.addMember = async (req, res) => {
    try {
        const team = await Teams.findById(req.params.id)
        const { email } = req.body
        const newuser = await User.findOne({ email })
        const admin = req.user.id

        if (!newuser) {
            res.status(400).json({
                success: false,
                err: "User not found"
            })
        }
        else if (team.members.includes(newuser.id)) {
            res.status(400).json({
                success: false,
                err: "User is already in team"
            })
        }
        else {

            if (team.members.includes(admin)) {
                team.members.push(newuser.id)
                newuser.team.push(team.id)
                await team.save()
                await newuser.save()
                res.status(200).json({
                    success: true,
                    msg: "User added"
                })
            }

            else {
                res.status(400).json({
                    success: false,
                    err: "You are not authorize"
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            err: err.message
        })
    }
}

// geting member's of a team 
exports.getMembers = async (req, res) => {
    try {
        const team = await Teams.findById(req.params.id)
        if (!team) {
            res.status(400).json({
                success: false,
                err: "Team not found"
            })
        } else {
            const members = await User.find({ _id: { $in: team.members } })
            res.status(200).json({
                success: true,
                members,
                admin: team.admin
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            err: err.message
        })
    }
}

// removing the members 
exports.removeMember = async (req, res) => {
    try {
        const { email } = req.body
        const team = await Teams.findById(req.params.id)
        const user = await User.findOne({ email })
        const admin = req.user.id

        if (!user) {
            res.status(400).json({
                success: false,
                err: "User not found"
            })
        }
        else if (team.admin.includes(admin) && admin !== user.id) {
            user.team.pull(team.id)
            team.members.pull(user.id)
            team.admin.pull(user.id)
            await user.save()
            await team.save()
            res.status(200).json({
                success: true,
                msg: "User removed ",
            })
        }
        else {
            res.status(400).json({
                success: false,
                err: "You are not authorize"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            err: err.message,
        })
    }
}

// User.updateMany({team:id,{$pull:{team:id}}})
// Delete the team by admin  and also remove the team from the user's team list
exports.deleteTeam = async (req, res) => {
    try {
        const id = req.params.id
        const team = await Teams.findById(id)
        if (!team) {
            res.status(400).json({
                success: false,
                err: "Team not found"
            })
        }
        if (team.admin.includes(req.user.id)) {
            await team.deleteOne()
            await User.updateMany({ team: id }, { $pull: { team: id } })
            res.status(200).json({
                success: true,
                msg: "Team deleted"
            })
        }
        else {
            res.status(400).json({
                success: false,
                err: "You are not authorize"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            err: err.message,
        })
    }
}


// creating user of team into admin of team

exports.addAdmin = async (req, res) => {
    try {
        const team = await Teams.findById(req.params.id)
        const user = await User.findOne(req.body)
        const admin = req.user.id

        if (!team.admin.includes(admin) || admin == user.id) {
            res.status(400).json({
                success: false,
                err: "You are not authorize"
            })
        }
        else if (!team.admin.includes(user.id) && team.admin.includes(admin)) {
            team.admin.push(user.id)
            await team.save()
            res.status(200).json({
                success: true,
                msg: "Admin added",
                admin: team.admin
            })
        }
        else {
            team.admin.pull(user.id)
            await team.save()
            res.status(200).json({
                success: true,
                msg: "Admin Removed",
                admin: team.admin
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            err: err.message
        })
    }
}
