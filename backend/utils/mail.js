const nodemailer = require('nodemailer');
const fs = require('fs')
const path = require('path')

async function sendEmail(toClient) {

    console.log(process.env.EMAIL);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    let otp = Math.round(Math.random() * 900000) + 100000;
    // Create the email message
    let message = {
        from: process.env.EMAIL,
        to: toClient,
        subject: `OTP (${otp}) delivered by the campus connect`,
        html: (fs.readFileSync(path.resolve(__dirname, './forgetpasswordTemplate.txt'), 'utf-8')).toString().replace("OTP_CODE", otp.toString())
    };

    try {
        let info = await transporter.sendMail(message);
        // console.log(info);
        return `Email sent ${otp}`;
    } catch (error) {

        console.log('Error occurred while sending email:', error);
        return "Error occurred while sending email";
    }
}

module.exports = sendEmail