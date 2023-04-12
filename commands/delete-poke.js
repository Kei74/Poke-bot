const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove-poke')
		.setDescription('remove poke by ID')
		.addIntegerOption(option =>
			option.setName('id')
				.setDescription('Poke ID')
				.setRequired(true)),

	async execute(interaction) {
		const pokeID = interaction.options.getInteger('id');
		if (interaction.client.pokes.has(pokeID)) {
			const poke = interaction.client.pokes.get(pokeID);
			poke.remove();
			interaction.client.pokes.delete(pokeID);
			await interaction.reply('Poke removed');
		} else {
			await interaction.reply('Poke does not exist');
		}

	},
};