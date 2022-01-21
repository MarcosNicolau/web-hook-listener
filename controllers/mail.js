const sendMail = require("../utils/send-email");
const dotenv = require("dotenv");
dotenv.config();

const mailDeploy = async (req, res) => {
	const { status, log } = req.body;
	const statusName = status ? "successful" : "failed";
	try {
		await sendMail({
			subject: `docker-compose had a ${statusName.toUpperCase()} deploy`,
			text: `A deploy ran, with a ${statusName} status. log: ${log}`,
			html: `<p>Server with ${process.env.DOCKER_IMAGE_NAME} image was pulled and run the latest image, with a ${statusName} deploy</p>
			<p>Docker log: ${log}</p>
			`,
		});
		res.send("email sended");
	} catch (error) {
		res.send(`could not send email, error ${error}`);
	}
};

module.exports = { mailDeploy };
