const transporter = require('../config/transporter');
const dotenv = require('dotenv');
dotenv.config();

const sendEmail = async ({ subject, text, html }) => {
	if (!process.env.NOTIFICATIONS_EMAIL_HOST) return;
	try {
		await transporter.sendMail({
			from: process.env.NOTIFICATION_EMAIL_FROM, // sender address
			to: process.env.NOTIFICATION_EMAIL_TO, // list of receivers
			subject,
			text,
			html,
		});
	} catch (err) {
		return err;
	}
};

module.exports = sendEmail;
