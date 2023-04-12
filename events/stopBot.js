const { join } = require('node:path');
const constPath = join('..', 'constants', 'paths.js');
const { eventsConstPath } = require(constPath);
const { StopBot } = require(eventsConstPath);

module.exports = {
	name: StopBot,
	async execute(client) {
		client.pokes.forEach(poke => {
			poke.pauseAndUpdate();
		});
		client.destroy();
	},
};