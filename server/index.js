const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config({path: '../.env'});

const app = express()

const PORT = 5003

const userRoutes = require('./routes/userRoute')
const turfRoutes = require('./routes/turfRoute')

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err))

app.use(express.json())
app.use(express.urlencoded())

app.use('/api/users' , userRoutes )

app.listen(PORT, () =>
    console.log('Server Started')
)