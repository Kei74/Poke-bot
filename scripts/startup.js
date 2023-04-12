const fs = require('node:fs');
const { join } = require('node:path');
const constPath = join(__dirname, 'constants', 'paths.js');
const { pokeModelPath, pokeListPath } = require(constPath);
const Poke = require(pokeModelPath);