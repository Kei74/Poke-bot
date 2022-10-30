module.exports = class Poke {
	constructor(initiator, target, channel, guild, message = '') {
		this.initiator = initiator;
		this.target = target;
		this.channel = channel;
		this.guild = guild;
		this.message = message;
		console.log(`Poke created by ${initiator}, with target ${target}, in channel ${channel} and message ${message}`);
	}
};