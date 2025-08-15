const express = require("express");
const router = express.Router();
const Turf = require("../models/turfModel");

router.post('/add-turf', async(req, res) =>{
    try {
        const newTurf = new Turf(req.body)
        await newTurf.save()
        res.send({
            success: true,
            message: "New turf has been added"
        })
    }

    catch(error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.put('/update-turf', async(req, res) =>{
    try{
        await Turf.findByIdAndUpdate(req.body.turfId, req.body);
        res.send({
            success: true,
            message: "Turf successfully updated"
        })
    }
    catch(error){
        res.send({
            success: false,
            message: error.message
        })
    }

})

router.put('/delete-turf', async(req, res) =>{
    try{
        await Turf.findByIdAndDelete(req.body.turfId);
        res.send({
            success: true,
            message: "Turf successfully deleted"
        })
    }
    catch(error){
        res.send({
            success: false,
            message: error.message
        })
    }

})

router.get('/get-all-turfs', async(req, res) =>{
    try{
        const allTurfs = await Turf.find().populate('owner');
        res.send({
            success: true,
            message: "All turfs fetched",
            data: allTurfs
        })
    }
    catch(error){
        res.send({
            success: false,
            message: error.message,  
        })
    }
})

router.post('/get-all-turfs-by-owner', async(req, res) =>{
    try{
        const allTurfs = await Turf.find({owner: req.body.owner});
        res.send({
            success: true,
            message: "All turfs fetched",
            data: allTurfs
        })
    }
    catch(error){
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.get('/:id/availability', async (req, res) => {
    try{
        const { id } = req.params;
        const { date } = req.query;

        if (!date) {
            return res.status(400).send({ 
                success: false, 
                message: 'Date is required' 
            });
        }

        const turf = await Turf.findById(id);
        if (!turf) {
            return res.status(404).send({ 
                success: false, 
                message: 'Turf not found' 
            });
        }

        const allSlots = [
            '06:00-07:00', '07:00-08:00', '08:00-09:00', '09:00-10:00',
            '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00',
            '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00',
            '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00'
        ];

        const booked = await Booking.find({
            turf: id,
            date: new Date(date)
        }).select('slot');

        const bookedSlots = booked.map(b => b.slot);

        const availableSlots = allSlots.filter(s => !bookedSlots.includes(s));

        res.status(200).send({
            success: true,
            message: 'Availability fetched successfully',
            data: {
                turf: turf.name,
                date,
                availableSlots
            }
        })
    }
    catch (error){
        res.status(500).send({ 
            success: false, 
            message: error.message 
        });
    }
})

module.exports = router;