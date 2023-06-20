const generateToken = require('../utils/generateToken.js')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

// API/LOGIN
// POST
// @Private <- Protected

const login = ('/', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.params);

    try {
        const user = await companyPage.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                isAdmin: user.isAdmin,
                isDean: user.isDean,
                isCareTaker: user.isCareTaker,
                isSportsIncharge: user.isSportsIncharge,
                token: generateToken(company._id)
            })
        } else {
            res.status(401);
            res.json({ "message": "Invalid email or password" })
        }
    } catch (err) {
        res.status(401);
        res.json({ "message": "Invalid email or password" })
    }


}))

export default login


