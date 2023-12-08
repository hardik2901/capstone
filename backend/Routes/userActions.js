const express = require('express')
const { getalluser, getSingleUser, updateUserDetails, forgetPassword, verifyOtp } = require('../Controller/userActions')
const router = express.Router();
const { protect, admin } = require('../Middleware/authentication')

router.route("/").get(protect, admin, getalluser);
router.route("/forgetpassword").post(forgetPassword);
router.route("/verifyotp").post(verifyOtp);
router.route("/:id").get(protect, getSingleUser).post(protect, updateUserDetails)


module.exports = router