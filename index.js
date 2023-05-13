const { Client, GatewayIntentBits, Events } = require('discord.js');
const dotenv = require('dotenv');
const { join } = require('node:path');
const constPath = join(__dirname, 'constants', 'paths.js');
const { attacherPath } = require(constPath);
// Create a new Client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const preloads = ['commandsAttacher.js', 'eventsAttacher.js'];
const postloads = ['pokeListAttacher.js'];
for (const file of preloads) {
	const filePath = join(attacherPath, file);
	const attacher = require(filePath);
	if ('attach' in attacher) {
		attacher.attach(client);
		console.log(`Attaching ${attacher.name}`);
	} else {
		console.log(`Error attaching ${attacher.name}`);
	}
}
client.once(Events.ClientReady, () => {
	for (const file of postloads) {
		const filePath = join(attacherPath, file);
		const attacher = require(filePath);
		if ('attach' in attacher) {
			attacher.attach(client);
			console.log(`Attached ${attacher.name}`);
		} else {
			console.log(`Error attaching ${attacher.name}`);
		}
	}

	console.log('Ready');
});
// Log in to Discord using Token
dotenv.config();
client.login(process.env.TOKEN);

if (process.env.KEEPALIVE) {
	const { server, PORT } = require('./utils/keepAlive.js');
	server.listen(PORT, () => console.log(`Keep alive server running on port ${PORT}`));

}

console.log('Ready');