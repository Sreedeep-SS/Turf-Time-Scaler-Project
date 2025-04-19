const express = require('express')
const mongoose = require('mongoose')

const app = express()

const PORT = 5003

mongoose.connect('mongodb+srv://sreedeepdeepu20122000:p1jGpmw77hwqINkW@cluster0.ageq8.mongodb.net/turfs?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err))

app.listen(PORT, () =>
    console.log('Server Started')
)


// MONGO_URI = "mongodb+srv://sreedeepdeepu20122000:p1jGpmw77hwqINkW@cluster0.ageq8.mongodb.net/turfs?retryWrites=true&w=majority&appName=Cluster0"
