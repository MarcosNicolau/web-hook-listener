const sendMail = require('../utils/send-email');
const dotenv = require('dotenv');
dotenv.config();

const mailDeploy = async (req, res) => {
	const { status, log } = req.query;
	const statusName = status ? 'successful' : 'failed';
	try {
		await sendMail({
			subject: `${process.env.DOCKER_IMAGE_NAME} ${statusName.toUpperCase()} deploy`,
			text: `Server with ${process.env.DOCKER_IMAGE_NAME} was pulled and run the latest image, with a ${statusName} deploy. Docker log: ${log}`,
			html: `<p>Server with ${process.env.DOCKER_IMAGE_NAME} image was pulled and run the latest image, with a ${statusName} deploy</p>
			<p>Docker log: ${log}</p>
			`,
		});
		res.send('email sended');
	} catch (err) {
		res.send(`could not send email, error ${error}`);
	}
};

module.exports = { mailDeploy };
