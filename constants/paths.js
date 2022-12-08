const path = require('node:path');

module.exports = {
	clientPath : path.join(__dirname, '..', 'models', 'client.js'),
	pokeModelPath : path.join(__dirname, '..', 'models', 'poke.js'),
	dataPath : path.join(__dirname, '..', 'data'),
	pokeListPath : path.join(__dirname, '..', 'data', 'pokelist.json'),
	commandsDirPath : path.join(__dirname, '..', 'commands'),
	commandsFactPath : path.join(__dirname, '..', 'utils', 'commandsFactory.js'),
	eventsDirPath : path.join(__dirname, '..', 'events'),
	eventsFactPath : path.join(__dirname, '..', 'utils', 'eventsFactory.js'),
};