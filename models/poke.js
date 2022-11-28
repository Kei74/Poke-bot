const fs = require('node:fs');
const path = require('node:path');
const constPath = path.join(__dirname, '..', 'constants', 'paths.js');
const { pokeListPath } = require(constPath);

module.exports = class Poke {

	static idList = new Set();

	static generateID() {
		const newId = Math.floor(Math.random() * 100000);
		return Poke.idList.has(newId) ? Poke.generateID() : newId;
	}

	constructor(authorId, targetId, channelId, message = null) {
		this.pokeId = Poke.generateID();
		Poke.idList.add(this.pokeId);
		this.authorId = authorId;
		this.targetId = targetId;
		this.channelId = channelId;
		this.message = message;
		console.log(`Poke ${this.pokeId} created by ${authorId}, with target ${targetId}, in channel ${channelId} and message ${message}`);
		Poke.pokeList.push(this);
	}

	static pokeList = JSON.parse(fs.readFileSync(pokeListPath).toString());
	static async saveList() {
		try {
			fs.writeFile(pokeListPath, JSON.stringify(Poke.pokeList));
			console.log('Pokelist saved to file');
		} catch (error) {
			console.error(`Error writing poke to file: ${error}`);
		}
	}
	static refreshList() {
		try {
			Poke.pokeList = JSON.parse(fs.readFileSync(pokeListPath).toString());
			console.log('Pokelist refreshed');
		} catch (error) {
			console.error(`Error refreshing list: ${error}`);
		}
	}
};