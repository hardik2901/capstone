const bcrypt = require('bcrypt')

function passwordHash(myPlaintextPassword) {
    bcrypt.hash(myPlaintextPassword, 10, function (err, hash) {
        try {
            return hash;
        } catch (err) {
            res.status(err);
        }
    });
}

module.exports = passwordHash;