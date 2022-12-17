const fs = require('node:fs');
const { join } = require('node:path');
const { dataPath, pokeListPath } = require(join(__dirname, 'constants', 'paths.js'));

try {
	fs.mkdirSync(dataPath);
	console.log(`Data directory created at ${dataPath}`);
} catch (error) {
	console.error(`Error creating data directory: ${error}`);
}

try {
	fs.writeFileSync(pokeListPath, JSON.stringify([]));
	console.log(`Poke list file created at ${pokeListPath}`);
} catch (error) {
	console.error(`Error creating Poke List file: ${error}`);
}

require('deploy-commands.js');