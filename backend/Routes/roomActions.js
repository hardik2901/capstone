const { getallrooms, getRoomByFilter } = require('../Controller/roomAction')
const express = require('express');
const router = express.Router();

router.route('').get(getallrooms);
router.route('filter').get(getRoomByFilter);

module.exports = router
