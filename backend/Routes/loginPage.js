const express = require('express');
const login = require('../Controller/loginPage.js');

const router = express.Router();

router.route('/').post(login);

module.exports = router;
