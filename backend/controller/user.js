const User = require("../models/user");
const Team = require("../models/teams");
exports.createUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const isuser = await User.findOne({ email })
        if (isuser) {
            return res.status(400).json({
                sucess: false,
                err: "User with same mail already exists"
            })
        }
        else {
            const user = await User.create({ name, email, password })
            res.status(200).json({
                sucess: true,
                msg: "User Created Sucessfully",
                user
            })
        }

    }
    catch (err) {
        res.status(500).json({
            sucess: false,
            err: err.message,
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({
                sucess: false,
                err: "User not found"
            })
        }
        else {
            const isMatch = await user.comparePass(password)
            if (!isMatch) {
                res.status(400).json({
                    sucess: false,
                    err: "Password is incorrect"
                })
            }
            else {
                const token = await user.token();
                res.status(200).cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" }).json({
                    sucess: true,
                    msg: "Login Sucessfully",
                    user
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            sucess: false,
            err: err.message,
        })
    }
}

exports.myprofile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({
            sucess: true,
            user,
        })
    } catch (err) {
        res.status(500).json({
            sucess: false,
            err: err.message
        })
    }
}

exports.logout = async (req, res) => {
    try {
        res.status(200).cookie("token", null, { httpOnly: true }).json({
            sucess: true,
            msg: "Logout Sucessfully"
        })
    }
    catch (err) {
        res.status(500).json({
            sucess: false,
            err: err.message
        })
    }
}


