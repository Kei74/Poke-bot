const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const constPath = path.join(__dirname, '..', 'constants.js');
const { commandsPath } = require(constPath);
// Create a new Client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Commands Map
client.commands = new Collection();
// Command files
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Execute interactions
client.on(Events.InteractionCreate, async interaction => {

	// console.log(interaction);
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: `Error executing command ${command.name}` });
	}
});
// Run when Client ready
client.once(Events.ClientReady, ctx => {
	console.log(`Client Ready; Logging in as ${ctx.user}`);
});

module.exports = client;