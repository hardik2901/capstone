
const { decode } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
const user = require('../Models/user')

const protect = async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] == 'Bearer'
    ) {

        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const userDetails = await user.findOne({ email: req.body.email });

            if (decoded.id !== userDetails._id.toString()) {
                throw new Error
            }
            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            res.json({
                "message": "Not authorized, token failed"
            })
        }
    }

    if (!token) {
        res.status(401)
        res.json({
            "message": "Not authorized, token failed"
        })
    }
}

const admin = async (req, res, next) => {
    try {
        if (req.body != null && req.body.isAdmin == true) {
            next()
        } else {
            res.status(401)
            res.json({
                "message": "Not authorized Admin, token failed"
            })
        }
    } catch (err) {
        res.status(401)
        res.json({
            "message": "Not authorized Admin, token failed"
        })
    }

}

const dean = (req, res, next) => {

    try {
        if (req.body && (req.body.isDean || req.body.isAdmin)) {
            next()
        } else {
            res.status(401)
            res.json({
                "message": "Not authorized, token failed"
            })
        }
    } catch (err) {
        res.status(401)
        res.json({
            "message": "Not authorized, token failed"
        })
    }

}

const sportsIncharge = (req, res, next) => {

    try {
        if (req.body && (req.body.isSportIncharge || req.body.isAdmin)) {
            next()
        } else {
            res.status(401)
            res.json({
                "message": "Not authorized, token failed"
            })
        }
    } catch (err) {
        res.status(401)
        res.json({
            "message": "Not authorized, token failed"
        })
    }

}

const caretaker = (req, res, next) => {

    try {
        if (req.body && (req.body.isCareTaker || req.body.isAdmin)) {
            next()
        } else {
            res.status(401)
            res.json({
                "message": "Not authorized, token failed"
            })
        }
    } catch (err) {
        res.status(401)
        res.json({
            "message": "Not authorized, token failed"
        })
    }

}

module.exports = { protect, admin, caretaker, sportsIncharge, dean }
