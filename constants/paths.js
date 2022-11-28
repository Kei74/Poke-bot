const path = require('node:path');

module.exports = {
	clientPath : path.join(__dirname, '..', 'models', 'client.js'),
	pokeModelPath : path.join(__dirname, '..', 'models', 'poke.js'),
	dataPath : path.join(__dirname, '..', 'data'),
	pokeListPath : path.join(__dirname, '..', 'data', 'pokelist.json'),
	commandsDirPath : path.join(__dirname, '..', 'commands'),
	commandsPath : path.join(__dirname, '..', 'models', 'commands.js'),
	eventsDirPath : path.join(__dirname, '..', 'events'),
	eventsPath : path.join(__dirname, '..', 'models', 'events.js'),
};