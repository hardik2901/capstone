const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    const value = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
    return value;
}

module.exports = generateToken;