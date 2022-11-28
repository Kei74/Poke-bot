const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop the bot session'),
	async execute(interaction) {
		await interaction.reply('Shutting down');
		console.log('Terminating session');
		try {
			interaction.client.destroy();
		} catch (error) {
			console.error(`Error ending session: ${error}`);
		}
	},
};