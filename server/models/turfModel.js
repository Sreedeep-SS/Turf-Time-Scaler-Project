const mongoose = require('mongoose')

const turfSchema = new mongoose.Schema({
    owner_contact: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    location:{
        type: String,
        required: false
    },
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
    }
}, {
    timestamps: true
}
);

const Turf = mongoose.model("turfs", turfSchema);

module.exports = Turf;