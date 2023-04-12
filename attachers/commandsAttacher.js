const { Collection } = require('discord.js');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');
const constPath = join(__dirname, '..', 'constants', 'paths.js');
const { commandsDirPath } = require(constPath);

const commandFiles = readdirSync(commandsDirPath).filter(file => file.endsWith('.js'));

function readCommandList() {
	const commandList = new Collection();
	for (const file of commandFiles) {
		const filePath = join(commandsDirPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			commandList.set(command.data.name, command);
			// console.log(`Set command: ${command.data.name}`);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
	return commandList;
}


const commandData = readCommandList().map(command => command.data.toJSON());

module.exports = {
	name: 'commands',
	attach(client) {
		client.commands = readCommandList();
	},
	commandData,
};