const asyncHandler = require('express-async-handler')
const Room = require('../Models/Room')
const roomBookRequest = require('../Models/roomBookRequest');
const User = require('../Models/User');

function doDateRangesIntersect(start1, end1, start2, end2) {
    return start1 <= end2 && start2 <= end1;
}


const bookRoom = asyncHandler(async (req, res) => {

    try {
        const roomId = req.params.id;
        const userId = req.user._id;

        let request = req.body;
        request = { ...request, "bookedBy": userId, "room": roomId };

        const room = Room.findById(roomId);

        // console.log(request);

        await roomBookRequest.create({
            startDate: request.startDate,
            endDate: request.endDate,
            description: request.description,
            bookedBy: request.bookedBy,
            room: request.room
        });
        res.json({ "message": "Room Booked Successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
});

const getAllRequests = asyncHandler(async (req, res) => {
    try {
        let requests = await roomBookRequest.find({ status: 'pending' }).lean();
        let answer = [];
        for (let request of requests) {
            const userDetails = await User.findById(request.bookedBy);
            const roomDetails = await Room.findById(request.room);
            request.startDate = new Date(request.startDate).toLocaleDateString()
            request.endDate = new Date(request.endDate).toLocaleDateString()
            answer.push(
                {
                    ...request,
                    'block': roomDetails.block,
                    'id': request._id,
                    'roomNumber': roomDetails.roomNumber,
                    'name': userDetails.firstName + ' ' + userDetails.lastName

                })


        }
        res.send(answer);
    } catch (err) {
        res.status(500).send(err);
    }
})



const getRequestById = asyncHandler(async (req, res) => {
    try {
        const requestId = req.params.id;
        const request = await roomBookRequest.findById(requestId);
        if (request) {
            res.send(request);
        }
        else {
            throw new Error("Unable to find any request with such Id")
        }

    } catch (err) {
        console.log(err)
        res.send(err);
    }
})

const updateRequest = asyncHandler(async (req, res, next) => {
    try {
        const requestId = req.params.id;
        const { receivedStatus } = req.body;
        const request = await roomBookRequest.findById(requestId);
        if (request.status !== 'pending') {
            res.send(`This request has already been ${request.status}, so it cannot be changed anymore.`);
        } else if (receivedStatus === 'accepted') {
            const room = await Room.findById(request.room);
            let checkIfClash = false;
            room.bookings.forEach(booking => {
                if (doDateRangesIntersect(booking.startDate, booking.endDate, request.startDate, request.endDate)) {
                    checkIfClash = true;
                }
            });

            if (checkIfClash) {
                res.send("Unable to process the request as there is already a booking available between these dates.");
            } else {
                request.status = 'accepted';
                request.acceptedBy = req.user._id;
                room.bookings.push({
                    startDate: request.startDate,
                    endDate: request.endDate,
                    bookingId: requestId
                });
                await request.save();
                await room.save();
                res.send("Updated the request.");
            }
        } else {
            request.status = 'rejected';
            await request.save();
            res.send("Updated the request.");
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});



module.exports = { bookRoom, getAllRequests, getRequestById, updateRequest }
