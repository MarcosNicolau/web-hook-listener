const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

//reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
	host: process.env.NOTIFICATIONS_EMAIL_HOST,
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: process.env.NOTIFICATIONS_EMAIL_USER,
		pass: process.env.NOTIFICATIONS_EMAIL_PASSWORD,
	},
});

module.exports = transporter;
