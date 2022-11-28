const { SlashCommandBuilder, ChannelType } = require('discord.js');
const path = require('node:path');
const constPath = path.join(__dirname, '..', 'constants', 'paths.js');
const { pokeModelPath } = require(constPath);
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
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('Channel where the poke will be sent')
				.addChannelTypes(ChannelType.GuildText)),

	async execute(interaction) {

		const target = interaction.options.getUser('target');
		const message = interaction.options.getString('message')
			? interaction.options.getString('message')
			: '';
		const channel = interaction.options.getChannel('channel')
			? interaction.options.getChannel('channel')
			: interaction.channel;
		try {
			const poke = new Poke(interaction.user.id, target.id, channel.id, message);
			await interaction.reply(`Poke Created: ${poke.pokeId}`);
		} catch (error) {
			await interaction.reply(`Error creating poke: ${error}`);
		}
	},
};