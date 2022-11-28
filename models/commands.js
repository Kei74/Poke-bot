const { Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const constPath = path.join(__dirname, '..', 'constants', 'paths.js');
const { commandsDirPath } = require(constPath);
// Commands Map
const commands = new Collection();
const commandData = [];
// Command files
const commandFiles = fs.readdirSync(commandsDirPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsDirPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		commands.set(command.data.name, command);
		commandData.push(command.data.toJSON());
		console.log(`Set command: ${command.data.name}`);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

module.exports = {
	commandList: commands,
	data: commandData,
};