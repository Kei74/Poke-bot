//Not working, will be removed
const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const { join } = require('node:path');
const constPath = join(__dirname, '..', 'constants', 'paths.js');
const { pokeListPath } = require(constPath);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Test random poke'),
	async execute(interaction) {
		const poke = JSON.parse(fs.readFileSync(pokeListPath).toString())[0];
		try {
			const channel = interaction.client.channels.resolve(poke.channel);
			channel.send('Test msg');
			console.log(`Interaction channel: ${interaction.channel}\nPoke Channel: ${poke.channel}\nParsed Channel: ${channel}`);
		} catch (error) {
			console.log(error);
		}
		await interaction.reply({ content: 'Successful test', ephermal: true });
	},
};