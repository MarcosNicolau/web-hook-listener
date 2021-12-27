const express = require("express");
const dotenv = require("dotenv");
const transporter = require("./config/transporter");
const { deployHook } = require("./controllers/deploy");
const { mailDeploy } = require("./controllers/mail");
dotenv.config();

const PORT = 3000;

const app = express();
app.use(express.json());

const deployRoute = process.env.PIPELINE_DEPLOY_ROUTE || "/deploy";

app.post(`${deployRoute}/mail`, mailDeploy);
app.post(deployRoute, deployHook);

app.listen(Number(PORT), "0.0.0.0", () => console.log(`server listening on port ${PORT}`));
