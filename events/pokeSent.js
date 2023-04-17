const { PokeSent } = require('../constants/events.js');

module.exports = {
	name: PokeSent,
	async execute(client, poke) {
		console.log(`Poke sent: ${poke.pokeID}`)
		poke.activate(client);
	}
}