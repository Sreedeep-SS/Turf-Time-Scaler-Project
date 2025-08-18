const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config({path: '../.env'});
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express()

const PORT = 5003

const userRoutes = require('./routes/userRoute')
const turfRoutes = require('./routes/turfRoute')
const bookingRoutes = require('./routes/bookingRoute')

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err))

app.use(express.json())
app.use(express.urlencoded())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users' , userRoutes )
app.use('/api/turf', turfRoutes)
app.use('/api/booking', bookingRoutes)

app.listen(PORT, () =>
    console.log('Server Started')
)