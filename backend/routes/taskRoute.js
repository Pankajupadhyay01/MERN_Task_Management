const express = require('express');
const { createTask, removeTask, fetchTask, changeStatus } = require('../controller/task');
const { isAuth } = require('../config/auth');

const router = express.Router();

router.route("/task/create/:id").post(isAuth, createTask)
router.route("/task/delete/:id").delete(isAuth, removeTask)
router.route("/task/tasks/:id").get(isAuth, fetchTask)
router.route("/task/change/:id").post(isAuth, changeStatus)
module.exports = router;