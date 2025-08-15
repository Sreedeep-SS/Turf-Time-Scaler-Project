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
                message: 'Turf not found'

            })
        }

        const bookingDate = new Date(date)
        const start = new Date(`${date}T${startTime}:00`);
        const end = new Date(`${date}T${endTime}:00`);

        if(end <= start) {
            return res.status(400).send({
                success: false,
                message: 'End time must be after start time'
            })
        }

        const overlap = await Booking.findOne({
            turf: turfId,
            date: bookingDate,
            $or: [
                { startTime: { $lt: end }, endTime: { $gt: start } }
            ]
        })

        if (overlap) {
            return res.status(400).send({
                success: false,
                message: 'Slot already booked'
            })
        }

        const hours = (end - start)/ (1000 * 60 * 60)
        const totalPrice = turf.price * hours

        const newBooking = await Booking.create({
            turf: turfId,
            user: userId,
            date: bookingDate,
            startTime: start,
            endTime: end,
            totalPrice,
            paymentStatus: 'pending'
        })

        res.status(201).send({
            success: true,
            message: 'Booking created successfully',
            data: newBooking
        })

    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }

})

router.get('my-bookings', async(req, res) => {
    try {
        const userId = req.body.id

        const myBookings = await Booking.find({ user: userId })
            .populate('turf', 'name location price')
            .sort({ date: -1 })

        res.status(200).send({
            success: true,
            message: 'Bookings fetched successfully',
            data: myBookings
        })
    } 
    catch (error){
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router