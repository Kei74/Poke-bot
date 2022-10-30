const path = require('node:path');

module.exports = {
	clientPath : path.join(__dirname, 'models', 'client.js'),
	pokeModelPath : path.join(__dirname, 'models', 'pokemodel.js'),
	dataPath : path.join(__dirname, 'data'),
	pokeListPath : path.join(__dirname, 'data', 'pokelist.json'),
	commandsPath : path.join(__dirname, 'commands'),
};