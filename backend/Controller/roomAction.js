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
        const startDate = req.query.startDate ? new Date(Number(req.query.startDate)) : null;
        const endDate = req.query.endDate ? new Date(Number(req.query.endDate)) : null;
        const minCapacity = req.query.minCapacity ? Number(req.query.minCapacity) : null;
        const isAcRequired = req.query.isAcRequired ? (req.query.isAcRequired === "true") : undefined;
        const blockPreference = req.query.blockPreference || null;

        const query = {};
        if (startDate && endDate) {
            query.booking = {
                $not: {
                    $elemMatch: {
                        startDate: { $lt: endDate },
                        endDate: { $gt: startDate }
                    }
                }
            }
        }
        if (blockPreference) {
            query.block = blockPreference;
        }

        if (isAcRequired) {
            query.isAc = isAcRequired
        }

        if (minCapacity) {
            query.capacity = { $gte: minCapacity };
        }
        const rooms = Room.find(query)

        res.send(rooms);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

module.exports = { getallrooms, getRoomById, getRoomByFilter };