const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const { pokeModelPath, pokeListPath } = require('../constants.js');
const Poke = require(pokeModelPath);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Add new poke')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('User to be poked')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('message')
				.setDescription('Poke message'))
		.addStringOption(option =>
			option.setName('channel')
				.setDescription('Channel where the poke will be sent')),

	async execute(interaction) {

		const target = interaction.options.getUser('target');
		const message = interaction.options.getString('message')
			? interaction.options.getString('message')
			: '';
		const channel = interaction.options.getChannel('channel')
			? interaction.options.getChannel('channel')
			: interaction.channel;
		const guild = interaction.guild;
		const poke = new Poke(interaction.user, target, channel, guild, message);

		const pokeList = JSON.parse(fs.readFileSync(pokeListPath).toString());
		pokeList.push(poke);
		try {
			fs.writeFileSync(pokeListPath, JSON.stringify(pokeList));
			await interaction.reply('Poke Created');
		} catch (error) {
			console.error(`Error writing poke to file: ${error}`);
			await interaction.reply(`Error, Poke not saved in file: ${error}`);
		}
	},
};