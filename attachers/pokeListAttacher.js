const { Collection } = require('discord.js');
const { join } = require('node:path');
const constPath = join('..', 'constants', 'paths.js');
const { pokeModelPath, eventsConstPath } = require(constPath);
const Poke = require(pokeModelPath);
// const { PokeCreate } = require(eventsConstPath);

module.exports = {
	name: 'pokes',
	async attach(client) {
		const pokeList = new Collection();
		await Poke.sync();
		const pokes = await Poke.findAll();
		pokes.forEach(poke => {
			poke.activate(client);
			pokeList.set(poke.pokeID, poke);
		});
		client.pokes = pokeList;
		console.log('Poke Attach working');
	},
};