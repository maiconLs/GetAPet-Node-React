import express from 'express'
import cors from 'cors'

const app = express()

app.use(json())

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use(static('public'))

import UserRoutes from './routes/UserRoutes'
import PetRoutes from './routes/PetRoutes'

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.listen(5000)