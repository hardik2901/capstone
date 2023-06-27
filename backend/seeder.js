const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userData = require('./Data/user.js')
const connectDB = require('./config/db.js')
const User = require('./Models/User.js');
const rooms = require('./Data/room.js')
const Room = require('./Models/Room.js')
const bookingRequestData = require('./Data/roomBookRequest.js')
const roomBookRequest = require('./Models/roomBookRequest.js')
const { passwordHash } = require('./utils/passwordHash.js')

dotenv.config();
connectDB();
const importData = async () => {
    try {
        userData.forEach(element => {
            element.password = passwordHash(element.password)
        });
        const temp = await User.insertMany(userData)
        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const importDataRoom = async () => {
    try {
        const temp = await Room.insertMany(rooms)
        console.log('Data Imported!')

        process.exit()
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

const importDataRoomRequest = async () => {
    try {
        const temp = await roomBookRequest.insertMany(bookingRequestData)
        console.log('Data Imported!')

        process.exit()
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}


const destroyData = async () => {
    try {
        await User.deleteMany()
        await Room.deleteMany()
        console.log('Data Deleted!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else if (process.argv[2] == '-b') {
    importDataRoomRequest();
}
else if (process.argv[2] == '-u') {
    importData()
} else if (process.argv[2] == '-r') {
    importDataRoom()
}