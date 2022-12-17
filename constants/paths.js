const { join } = require('node:path');

module.exports = {
	clientPath: join(__dirname, '..', 'models', 'client.js'),
	pokeModelPath: join(__dirname, '..', 'models', 'poke.js'),
	dataPath: join(__dirname, '..', 'data'),
	pokeListPath: join(__dirname, '..', 'data', 'pokelist.json'),
	commandsDirPath: join(__dirname, '..', 'commands'),
	commandsFactPath: join(__dirname, '..', 'utils', 'commandsFactory.js'),
	eventsDirPath: join(__dirname, '..', 'events'),
	eventsFactPath: join(__dirname, '..', 'utils', 'eventsFactory.js'),
};