const { Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const constPath = path.join(__dirname, '..', 'constants', 'paths.js');
const { commandsDirPath } = require(constPath);

const commandFiles = fs.readdirSync(commandsDirPath).filter(file => file.endsWith('.js'));

function readCommandList() {
	const commandList = new Collection();
	for (const file of commandFiles) {
		const filePath = path.join(commandsDirPath, file);
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

function readCommandData() {
	const commandData = readCommandList().map(command => command.data.toJSON());
	return commandData;
}

module.exports = class Commands {
	static addCommands(client) {
		client.commands = readCommandList();
	}
	static fetchData() {
		return readCommandData();
	}
};