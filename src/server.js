const express = require('express')
const AuthController = require('./controller/AuthController')
const AdminController = require('./controller/AdminController')
const authenticateMiddleware = require('./middlewares/authenticate')


const app = express()

const PORT = 3001

app.use(express.json())

app.use('/auth', AuthController)
app.use('/admin', authenticateMiddleware, AdminController)


app.listen(PORT, console.log(`Server running on ${PORT}`))