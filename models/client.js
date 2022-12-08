const { Client, GatewayIntentBits } = require('discord.js');
const path = require('node:path');
const constPath = path.join(__dirname, '..', 'constants', 'paths.js');
const { commandsPath, eventsPath } = require(constPath);
// Create a new Client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Execute interactions
const Events = require(eventsPath);
Events.addEvents(client);
// Commands Map
const Commands = require(commandsPath);
// console.log(Commands);
Commands.addCommands(client);

module.exports = client;