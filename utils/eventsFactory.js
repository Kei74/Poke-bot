const fs = require('node:fs');
const { join } = require('node:path');
const constPath = join(__dirname, 'constants', 'paths.js');
const { eventsDirPath } = require(constPath);

const eventFiles = fs.readdirSync(eventsDirPath).filter(file => file.endsWith('.js'));

module.exports = {
	eventsFactory(client) {
		for (const file of eventFiles) {
			const filePath = join(eventsDirPath, file);
			const event = require(filePath);
			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args));
			} else {
				client.on(event.name, (...args) => event.execute(...args));
			}
		}
	},
	eventFiles,
};