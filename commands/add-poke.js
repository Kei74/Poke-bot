const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { join } = require('node:path');
const constPath = join('..', 'constants', 'paths.js');
const { pokeModelPath } = require(constPath);
const Poke = require(pokeModelPath);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-poke')
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
		const generatedPokeID = Poke.generateID();
		const authorOption = interaction.user.id;
		const targetOption = interaction.options.getUser('target').id;
		const channelOption = interaction.options.getChannel('channel')
			? interaction.options.getChannel('channel').id
			: interaction.channel.id;
		const messageOption = interaction.options.getString('message');
		//	? interaction.options.getString('message')
		//	: null;
		try {
			const poke = Poke.build({
				pokeID: generatedPokeID,
				authorID: authorOption,
				targetID: targetOption,
				channelID: channelOption,
				message: messageOption,
			});
			poke.activate(interaction.client);
			interaction.client.pokes.set(poke.pokeID, poke);
			console.log(`poke created: ID: ${poke.pokeID}`);
			await interaction.reply(`Poke Created: ${poke.pokeID}`);
			poke.save();
		} catch (error) {
			console.error(`Error creating poke: ${error}`);
		}
	},
};