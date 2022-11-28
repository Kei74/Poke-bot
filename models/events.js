const fs = require('node:fs');
const path = require('node:path');
const constPath = path.join(__dirname, '..', 'constants', 'paths.js');
const { eventsDirPath } = require(constPath);

module.exports = class Events {
	static eventFiles = fs.readdirSync(eventsDirPath).filter(file => file.endsWith('.js'));
	static addEvents(client) {
		for (const file of Events.eventFiles) {
			const filePath = path.join(eventsDirPath, file);
			const event = require(filePath);
			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args));
			} else {
				client.on(event.name, (...args) => event.execute(...args));
			}
		}
	}
};