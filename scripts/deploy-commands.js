const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');
const { join } = require('node:path');
const constPath = join(__dirname, '..', 'constants', 'paths.js');
const { commandsAttacherPath } = require(constPath);

const { commandData } = require(commandsAttacherPath);
dotenv.config();
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commandData.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENTID),
			{ body: commandData },
		);

		// @ts-ignore
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(`Error pushing commands: ${error}`);
	}
})();