// Unused

const { join } = require('node:path');
const constPath = join('..', 'constants', 'paths.js');
const { eventsConstPath } = require(constPath);
const { PokeCreate } = require(eventsConstPath);

// TODO: add provision for saving remaining time
// https://stackoverflow.com/questions/3144711/find-the-time-left-in-a-settimeout

module.exports = {
	name: PokeCreate,
	async execute(client, poke) {
		console.log('Poke Create event triggered: \n\n');
		console.log(poke);
	},
};