const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userData = require('./Data/user.js')
const connectDB = require('./config/db.js')
const user = require('./Models/user.js');

dotenv.config();
connectDB();
console.log(user);
const importData = async () => {
    try {
        const temp = await user.insertMany(userData)
        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await user.deleteMany()
        console.log('Data Deleted!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
