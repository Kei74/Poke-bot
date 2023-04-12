const { join } = require('node:path');
const constPath = join(__dirname, '..', 'constants', 'paths.js');
const { pokeModelPath } = require(constPath);
const { Poke } = require(pokeModelPath);

