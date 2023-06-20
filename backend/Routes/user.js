const express = require('express');
const login = import('../Controller/user.js')

const router = express.Router();

router.route('/').post(login);