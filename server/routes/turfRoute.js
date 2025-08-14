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

module.exports = router;