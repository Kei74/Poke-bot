const { Client, GatewayIntentBits } = require('discord.js');
const path = require('node:path');
const constPath = path.join(__dirname, '..', 'constants', 'paths.js');
const { commandsFactPath, eventsFactPath } = require(constPath);
// Create a new Client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Execute interactions
const { eventsFactory } = require(eventsFactPath);
eventsFactory(client);
const { commandsFactory } = require(commandsFactPath);
commandsFactory(client);

module.exports = client;