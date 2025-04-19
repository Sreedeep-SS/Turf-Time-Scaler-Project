const express = require('express')
const mongoose = require('mongoose')

const app = express()

const PORT = 5003

mongoose.connect('')
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err))

app.listen(PORT, () =>
    console.log('Server Started')
)