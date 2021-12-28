const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use(express.static('public'))

const UserRoutes = require('./routes/UserRoutes')

app.use('/users', UserRoutes)

app.listen(5000)