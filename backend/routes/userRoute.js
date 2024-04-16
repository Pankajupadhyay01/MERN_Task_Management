const express = require("express")
const { createUser, login, myprofile, logout } = require("../controller/user");
const { isAuth } = require("../config/auth");
const router = express.Router();

router.route('/user/signup').post(createUser)
router.route('/user/login').post(login)
router.route('/user/me').get(isAuth, myprofile)
router.route('/user/logout').get(logout)





module.exports = router;