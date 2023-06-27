const User = require('../Models/User')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')

// API/LOGIN
// POST
// @Private <- Protected

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const userData = await User.findOne({ email: email });
        console.log(userData)
        const matchPassword = await bcrypt.compare(password, userData.password);
        console.log(matchPassword)
        if (userData !== null && matchPassword == true) {
            res.json({
                _id: userData._id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phoneNumber: userData.phoneNumber,
                isAdmin: userData.isAdmin,
                isDean: userData.isDean,
                isCareTaker: userData.isCareTaker,
                isSportsIncharge: userData.isSportsIncharge,
                token: generateToken(userData._id)
            })
        } else {
            res.status(401);
            res.json({ "message": "Error while logging in" })
        }
    } catch (err) {
        res.status(401);
        console.log(err);
        res.json({ "message": "Some other error might be invalid email or password" })
    }
})

module.exports = login



