const bcrypt = require('bcrypt')

function passwordHash(myPlaintextPassword) {
    const hash = bcrypt.hashSync(myPlaintextPassword, 15);
    return hash;
}

module.exports = { passwordHash };