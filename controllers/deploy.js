const shell = require("shelljs");
const dotenv = require("dotenv");
dotenv.config();

const deployHook = (req, res) => {
	const { push_data } = req.body;
	const { token, script } = req.query;
	//We don't want to fire deploy if the image tag is no latest
	if (push_data.tag !== "latest") return res.send("not latest tag");
	if (!token) return res.status(401).send("missing token");
	if (token !== process.env.PIPELINE_TOKEN) {
		console.log("wrong token");
		return res.status(401).send("wrong token");
	}
	res.send("success");
	shell.chmod("+x", `${process.env.SCRIPTS_DIRECTORY}/${script || "deploy"}.sh`);
	shell.exec(`${process.env.SCRIPTS_DIRECTORY}/${script || "deploy"}.sh`, { async: true });
};

module.exports = {
	deployHook,
};
