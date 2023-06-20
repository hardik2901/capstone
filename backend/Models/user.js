// const mongoose = require('mongoose')

// const homePageSchema = new mongoose.Schema({

//     title: {
//         type: String,
//         default: "",
//     },
//     coverPhoto: {
//         type: String,
//         default: "",
//     },
//     discription: {
//         type: String,
//         default: "",
//     },
//     Location: {
//         type: String,
//         default: "",
//     }, rawHtml: {
//         type: String,
//         default: "",
//     }
// }, { timestamps: true }
// );

// const homePage = mongoose.model('homePage', homePageSchema)

// module.export = homePage


const mongoose = require('mongoose')
const { isEmail } = require('validator')

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
    }

}, { timestamps: true }
);

const user = mongoose.model('user', userSchema);

module.exports = user