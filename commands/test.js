const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Test random poke'),
	async execute(interaction) {
		await interaction.reply('Fetching pokelist');
	},
};