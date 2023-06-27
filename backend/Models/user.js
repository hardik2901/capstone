const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        required: true,
        default: "",
    },
    phoneNumber: {
        type: String,
        minLength: 10,
        maxLength: 10,
        required: true,
        default: ""
    },
    password: {
        type: String,
        minLength: 8,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isDean: {
        type: Boolean,
        default: false,
    },
    isCareTaker: {
        type: Boolean,
        default: false,
    },
    isSportsIncharge: {
        type: Boolean,
        default: false,
    },
    profilePhoto: {
        type: String,
        required: true,
        default: ""
    },
    otpCodes: {
        type: String,
        default: ""
    }
}, { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(15)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema);

module.exports = User