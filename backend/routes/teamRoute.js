const express = require('express')
const { createTeam, deleteTeam, addMember, removeMember, getTeams, getMembers, addAdmin } = require('../controller/teams')
const { isAuth } = require('../config/auth')
const router = express.Router()

router.route("/teams/create").post(isAuth, createTeam)
router.route("/teams/get").get(isAuth, getTeams)
router.route("/teams/getmember/:id").get(isAuth, getMembers)
router.route("/teams/delete/:id").get(isAuth, deleteTeam)
router.route("/teams/adduser/:id").post(isAuth, addMember)
router.route("/teams/remove/:id").post(isAuth, removeMember)
router.route("/teams/makeadmin/:id").post(isAuth, addAdmin)


module.exports = router 