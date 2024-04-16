const app = require('./app')
const { dbcon } = require('./config/database')

dbcon()
app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`)
})