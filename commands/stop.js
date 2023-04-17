const { SlashCommandBuilder } = require('discord.js');
//const { join } = require('node:path');
//const constPath = join('..', 'constants', 'paths.js');
//const { eventsConstPath } = require(constPath);
const { StopBot } = require('../constants/events.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop the bot session'),
	async execute(interaction) {
		await interaction.reply('Shutting down');
		console.log('Terminating session');
		interaction.client.emit(StopBot, interaction.client);
		console.log('Logging Off');
	},
};