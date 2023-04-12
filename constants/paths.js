const { join } = require('node:path');

module.exports = {
	pokeModelPath: join(__dirname, '..', 'models', 'poke.js'),
	databasePath: join(__dirname, '..', 'models', 'database.js'),
	pokeListPath: join(__dirname, '..', 'utils', 'pokeListProvider.js'),
	eventsConstPath: join(__dirname, 'events.js'),
	commandsDirPath: join(__dirname, '..', 'commands'),
	eventsDirPath: join(__dirname, '..', 'events'),
	attacherPath: join(__dirname, '..', 'attachers'),
	eventsAttacherPath: join(__dirname, '..', 'attachers', 'eventsAttacher.js'),
	commandsAttacherPath: join(__dirname, '..', 'attachers', 'commandsAttacher.js'),
};