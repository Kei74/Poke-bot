const dotenv = require('dotenv');
const { clientPath } = require('./constants.js');
const client = require(clientPath);

// Log in to Discord using Token
dotenv.config();
client.login(process.env.TOKEN);