
const { decode } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
const User = require('../Models/User')

const protect = async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] == 'Bearer'
    ) {

        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id);

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

const user = async (req, res, next) => {
    try {
        if (req.user && req.user._id == req.body.id) {
            next();
        } else {
            throw new "Not authorized Admin, token failed"
        }
    } catch (err) {
        res.status(401)
        res.json({
            "message": "Not authorized Admin, token failed"
        })
    }
}

const admin = async (req, res, next) => {
    try {
        if (req.user != null && req.user.isAdmin == true) {
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
        if (req.user && (req.user.isDean || req.user.isAdmin)) {
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
        if (req.body && (req.user.isSportIncharge || req.user.isAdmin)) {
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
        if (req.body && (req.user.isCareTaker || req.user.isAdmin)) {
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

module.exports = { protect, user, admin, caretaker, sportsIncharge, dean }
