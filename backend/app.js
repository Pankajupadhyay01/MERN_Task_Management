const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")

const helmet = require("helmet")

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(helmet())

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))


// import routes
const user = require("./routes/userRoute")
const task = require("./routes/taskRoute")
const teams = require("./routes/teamRoute")

app.use("/api/v1", user)
app.use("/api/v1", task)
app.use("/api/v1", teams)

if (process.env.NODE_ENV !== "production ") {
    require("dotenv").config({ path: "./config/.env" })
}

module.exports = app;