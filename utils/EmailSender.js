const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',  // Use your email provider
        auth: {
            user: process.env.EMAIL_USERNAME, // Your email
            pass: process.env.EMAIL_PASSWORD, // Your email password
        },
    });

    const mailOptions = {
        from: 'E-learning <toss800@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
