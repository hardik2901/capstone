const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
    block: {
        type: String,
        required: true
    },
    isAc: {
        type: Boolean,
        required: true
    },
    bookings: [{
        startDate: {
            type: Date,
            default: null
        },
        endDate: {
            type: Date,
            default: null
        },
        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'roomBookRequest'
        }
    }
    ],
    roomPhoto: {
        type: String,
        default: ""
    }
}, { timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;

