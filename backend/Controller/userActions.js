const asyncHandler = require('express-async-handler')
const User = require('../Models/User')
const bcrypt = require('bcrypt')
const { passwordHash } = require('../utils/passwordHash')
const sendEmail = require('../utils/mail')
const room = require('../Models/Room')

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
        res.send(err);
    }
})

const updateUserDetails = asyncHandler(async (req, res) => {

    const newDetails = req.body;
    const userId = req.user._id;
    try {


        const userDetails = await User.findById(userId);
        if (userDetails != null) {
            userDetails.firstName = newDetails.firstName || userDetails.firstName;
            userDetails.lastName = newDetails.lastName || userDetails.lastName;
            userDetails.phoneNumber = newDetails.phoneNumber || userDetails.phoneNumber;
            userDetails.profilePhoto = newDetails.profilePhoto || userDetails.profilePhoto;

            if (newDetails.password != null && newDetails.currentPassword != null) {
                console.log("hello");
                const matchPassword = await bcrypt.compare(newDetails.currentPassword, userDetails.password);
                console.log(matchPassword);
                if (matchPassword) {
                    userDetails.password = passwordHash(newDetails.password);
                }
                else {
                    throw "Password Entered in the current password field does not match with the actual current password";
                }
            }
            else {
                throw "Password Entered in the current password field does not match with the actual current password";
            }
            userDetails.save();
            res.json(userDetails);
        }
    } catch (err) {
        res.json(err);
    }
})

const forgetPassword = asyncHandler(async (req, res) => {

    const userDetails = await User.findOne(req.user._id);
    const { email } = req.body;
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
                    res.send(true);
                }
                else {
                    res.send(false);
                }
            }
            else {
                res.send("Invalid Otp Entered");
            }
        }
    } catch (error) {
        console.log(error);
        res.send("Invalid Otp Entered");
    }
})



module.exports = { getalluser, getSingleUser, updateUserDetails, forgetPassword, verifyOtp }



