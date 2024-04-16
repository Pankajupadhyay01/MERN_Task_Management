const User = require("../models/user")
const jwt = require("jsonwebtoken")
exports.isAuth = async (req, res, next) => {
    try {
        const { token } = await req.cookies
        if (!token) {
            res.status(400).json({
                sucess: false,
                err: "Please login first"
            })
        }
        else {
            const user = jwt.verify(token, process.env.JWT)
            req.user = await User.findById(user._id)
            next()
        }
    } catch (error) {
        res.status(500).json({
            sucess: false,
            err: error.message
        })
    }
}