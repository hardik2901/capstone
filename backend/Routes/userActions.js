const express = require('express')
const { getalluser, getSingleUser, updateUserDetails, forgetPassword, verifyOtp } = require('../Controller/userActions')
const router = express.Router();
const { protect, admin } = require('../Middleware/authentication')

router.route("/").get(protect, admin, getalluser);
router.route("/:id").get(protect, getSingleUser).put(protect, updateUserDetails)
router.route("/forgetpassword/:id").post(protect, forgetPassword);
router.route("/verifyotp/:id").post(protect, verifyOtp);

module.exports = router