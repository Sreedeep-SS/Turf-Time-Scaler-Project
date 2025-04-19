const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config({path: '../.env'});

const app = express()

const PORT = 5003

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err))

app.listen(PORT, () =>
    console.log('Server Started')
)