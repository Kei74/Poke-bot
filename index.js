const dotenv = require('dotenv');
const path = require('node:path');
const constPath = path.join(__dirname, 'constants', 'paths.js');
const { clientPath } = require(constPath);
const client = require(clientPath);

// Log in to Discord using Token
dotenv.config();
client.login(process.env.TOKEN);