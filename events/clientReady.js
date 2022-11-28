const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(ctx) {
		console.log(`Client Ready; Logging in as ${ctx.user}`);
	},
};