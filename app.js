const express = require('express');
const dotenv = require('dotenv');
const transporter = require('./config/transporter');
const { deployHook } = require('./controllers/deploy');
const { mailDeploy } = require('./controllers/mail');
dotenv.config();

const app = express();
app.use(express.json());

app.get('/mail/deploy', mailDeploy);
app.post(process.env.DEPLOY_ROUTE || '/deploy', deployHook);

app.listen('3000', () => console.log('hook listening on port 3000'));
