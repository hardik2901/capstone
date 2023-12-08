const { getallrooms, getRoomByFilter, getRoomById } = require('../Controller/roomAction')
const express = require('express');
const router = express.Router();

router.route('').get(getallrooms);
router.route('/single/:id').get(getRoomById);
router.route('/filter').post(getRoomByFilter);

module.exports = router
