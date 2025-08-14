const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Booking = require('../models/bookingModel')
const Turf = require('../models/turfModel')


router.post('/book-venue', async(req, res) => {
    try{
        const { userId, turfId, date, startTime, endTime } = req.body;

        const turf = await Turf.findById(turfId)
        if(!turf){
            return res.status(404).send({
                success: false,

            })
        }

    }

})