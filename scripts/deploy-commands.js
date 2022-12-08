const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');
const path = require('node:path');
const constPath = path.join(__dirname, '..', 'constants', 'paths.js');
const { commandsFactPath } = require(constPath);

const { commandData } = require(commandsFactPath);
dotenv.config();
const rest = new REST({ version: '10' }).setToken(process.env.token);

(async () => {
	try {
		console.log(`Started refreshing ${commandData.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(process.env.clientId),
			{ body: commandData },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(`Error pushing commands: ${error}`);
	}
})();