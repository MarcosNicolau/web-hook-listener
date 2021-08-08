const shell = require('shelljs');
const dotenv = require('dotenv');
dotenv.config();

const deployHook = (req, res) => {
	const { token, script } = req.query;
	if (token !== process.env.DEPLOY_TOKEN) {
		console.log('wrong token');
		return res.status(401).send('wrong token');
	}
	res.send('success');
	console.log(req.body);
	shell.chmod('+x', `/scripts/${script || 'deploy'}.sh`);
	shell.exec(`/scripts/${script || 'deploy'}.sh`, { async: true });
};

module.exports = {
	deployHook,
};
