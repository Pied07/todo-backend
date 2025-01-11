const express = require('express')
const sequelize = require('./config/db')
const path = require('path')
const cors = require('cors')
const todoRoutes = require('./routes/todoRoutes')
const app = express()

app.use(cors())

app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs')

app.use(express.json())

app.use(express.static(path.join(__dirname,'../todo_client/dist')))

app.use('/tasks',todoRoutes)

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'../todo_client/dist','index.html'))
})

const port = 3000;

(async () => {
    try {
        await sequelize.sync()
        console.log("Database Connection Established!!!")
        app.listen(port, () => console.log(`Server started on http://localhost:${port}`))
    } catch (error) {
        console.log("Error While Establishing Database Connection: ",error)
    }
})();