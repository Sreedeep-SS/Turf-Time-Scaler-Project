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
        bookingDate.setUTCHours(0, 0, 0, 0);
        const start = new Date(`${date}T${startTime}:00`);
        const end = new Date(`${date}T${endTime}:00`);

        const hours = (end - start)/ (1000 * 60 * 60)
        const totalPrice = turf.price * hours

        const newBooking = await Booking.create({
            venue: turfId,
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

router.get('/my-bookings', authMiddleware, async(req, res) => {
    try {
        const userId = req.body.userId

        const myBookings = await Booking.find({ user: userId })
            .populate('venue', 'name location price')
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

router.get('/admin-bookings',authMiddleware, async(req, res) => {
    try{
        const adminId = req.body.userId
        const { turfId, status, date } = req.query;

        const turfs = await Turf.find({ owner: adminId }).select('_id');
        const turfIds = turfs.map(t => t._id);

        if (!turfIds.length) {
            return res.status(404).send({
                success: false,
                message: 'No turfs found for this admin'
            });
        }

        const query = { venue: { $in: turfIds } };

        if (turfId) query.venue = turfId;
        if (status) query.paymentStatus = status; 
        if (date) query.date = new Date(date);


        const bookings = await Booking.find(query)
            .populate('venue', 'name location')
            .populate('user', 'name email')
            .sort({ date: 1, startTime: 1 });

        res.status(200).send({
            success: true,
            message: 'Admin bookings fetched successfully',
            data: bookings
        })
    }
    catch (error){
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
})


module.exports = router

