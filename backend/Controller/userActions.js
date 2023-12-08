const asyncHandler = require('express-async-handler')
const User = require('../Models/User')
const bcrypt = require('bcrypt')
const { passwordHash } = require('../utils/passwordHash')
const sendEmail = require('../utils/mail')
const room = require('../Models/Room')
const generateToken = require('../utils/generateToken')

// API/LOGIN
// POST
// @Private <- Protected

const getalluser = asyncHandler(async (req, res) => {

    try {
        const documents = await User.find({});
        console.log(documents);
        res.json(documents);
    } catch (error) {
        console.error(error);
        res.json({ "message": `some error occured while getting the details of all the users ${error}` })
    }
})

const getSingleUser = asyncHandler(async (req, res) => {
    try {
        const userID = req.user._id;
        const userData = await User.findById({ _id: userID });

        if (userData != null) {
            res.json(userData);
        }
        else {
            throw "User not found with the given id";
        }
    }
    catch (err) {
        res.status(403).send(err);
    }
})

const updateUserDetails = asyncHandler(async (req, res) => {

    const newDetails = req.body;
    const userId = req.user._id;
    try {
        const userDetails = await User.findById(userId);
        if (userDetails != null) {
            userDetails.password = newDetails.password;
        }
        else {
            throw "No User Found";
        }
        userDetails.save();
        res.json(userDetails);
    } catch (err) {
        res.status(500).json(err);
    }
})

const forgetPassword = asyncHandler(async (req, res) => {

    console.log('here');
    const { email } = req.body;
    const userDetails = await User.findOne({ email: email });
    try {
        if (userDetails != null) {
            const checkmailStatus = (await sendEmail(email)).toString();
            if (checkmailStatus.startsWith('Email sent')) {
                const otp = checkmailStatus.split(' ')[2];
                userDetails.otpCodes = otp.toString() + ' ' + Date();
                userDetails.save();
                res.send("Otp successfully sent!");
            }
            else {
                res.send("Error while delivering the email for the otp")
            }

        }
        else {
            throw "No user found with the entered email";
        }
    } catch (err) {
        console.log(err);
        res.json(err);
    }
})

const verifyOtp = asyncHandler(async (req, res) => {

    try {
        const { email, otpCodes } = req.body;
        const userDetails = await User.findOne({ email: email })
        if (userDetails != null) {
            const otpCodeString = userDetails.otpCodes;
            const storedOtp = (otpCodeString.split(' ')[0]).toString();
            const otpTime = otpCodeString.substring(storedOtp.length + 1, otpCodeString.length);

            const otpDate = new Date(otpTime);

            if (new Date() - otpDate <= 300000) {
                if (otpCodes == storedOtp) {
                    res.json({ "status": true, "user": userDetails, token: generateToken(userDetails._id) });
                }
                else {
                    res.send({ "status": false });
                }
            }
            else {
                res.send("Invalid Otp Entered");
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Invalid Otp Entered");
    }
})



module.exports = { getalluser, getSingleUser, updateUserDetails, forgetPassword, verifyOtp }



