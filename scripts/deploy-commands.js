const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const dotenv = require('dotenv');
const path = require('node:path');
const constPath = path.join(__dirname, '..', 'constants', 'paths.js');
const { commandsDirPath } = require(constPath);

const commands = [];
const commandFiles = fs.readdirSync(commandsDirPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	try {
		const command = require(path.join(commandsDirPath, file));
		commands.push(command.data.toJSON());
	} catch (error) {
		console.error(`Error pushing command from file ${file}: ${error}`);
	}
}
dotenv.config();
const rest = new REST({ version: '10' }).setToken(process.env.token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(process.env.clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(`Error pushing commands: ${error}`);
	}
})();