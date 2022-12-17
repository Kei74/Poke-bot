const dotenv = require('dotenv');
const { join } = require('node:path');
const constPath = join(__dirname, 'constants', 'paths.js');
const { clientPath } = require(constPath);
const client = require(clientPath);

// Log in to Discord using Token
dotenv.config();
client.login(process.env.TOKEN);