const express = require('express')
const { protect, dean } = require('../Middleware/authentication')
const { bookRoom, getAllRequests, updateRequest, getRequestById } = require('../Controller/roomBookRequest')
const router = express.Router();

router.route('').get(protect, dean, getAllRequests)
router.route('/:id').post(protect, bookRoom).get(protect, getRequestById)
router.route('/update/:id').post(protect, dean, updateRequest)

module.exports = router;