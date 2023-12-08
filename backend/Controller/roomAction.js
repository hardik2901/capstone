const asyncHandler = require('express-async-handler')
const Room = require('../Models/Room')

const getallrooms = asyncHandler(async (req, res) => {
    try {
        const allRooms = await Room.find({});
        res.send(allRooms);
    } catch (error) {
        console.log(error);
        res.semd(error);
    }
})

const getRoomById = asyncHandler(async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        res.send(room);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

const getRoomByFilter = asyncHandler(async (req, res) => {
    try {
        const startDate = req.body.startDate ? new Date(Number(req.body.startDate)) : null;
        const endDate = req.body.endDate ? new Date(Number(req.body.endDate)) : null;
        const minCapacity = req.body.value[0];
        const isAcRequired = req.body.ac;
        const blockPreference = req.body.blocks

        const allRoom = await Room.find();
        let filteredRooms = []
        allRoom.forEach(room => {
            let check = true;
            if (room.isAc != isAcRequired) {
                return;
            }
            if (blockPreference && !blockPreference.includes(room.block)) {

                return;
            }
            if (minCapacity > room.capacity) {

                return;
            }
            if (check) {
                room.bookings.forEach(booking => {
                    if (startDate != null && endDate !== null && ((startDate <= booking.startDate && endDate >= booking.startDate) || (startDate >= booking.startDate && endDate <= booking.endDate) || (startDate <= booking.endDate && endDate >= booking.endDate))) {
                        check = false;
                        return;
                    }
                    else if (startDate != null && startDate >= booking.startDate && startDate <= booking.endDate) {
                        check = false;
                        return;
                    }
                    else if (endDate != null && endDate >= booking.startDate && endDate <= booking.endDate) {
                        check = false;
                        return;
                    }

                })
            }

            if (check) {
                filteredRooms.push(room)
            }


        });
        res.send(filteredRooms)

    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

module.exports = { getallrooms, getRoomById, getRoomByFilter };