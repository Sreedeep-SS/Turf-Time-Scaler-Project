const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "turfs"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "cancelled"],
        default: "pending"
    }
}, {timestamps:true});

bookingSchema.pre('save', async function (next) {
    const booking = this;

    
    if (booking.endTime <= booking.startTime) {
        return next(new Error('End time must be after start time'));
    }

    const overlap = await mongoose.model('bookings').findOne({
        venue: booking.venue,
        date: booking.date,
        startTime: { $lt: booking.endTime },
        endTime: { $gt: booking.startTime }
    });

    if (overlap) {
        return next(new Error('Slot already booked'));
    }

    next();
});

const Booking = mongoose.model("bookings", bookingSchema);

module.exports = Booking;