/* eslint-disable no-inline-comments */
const { DataTypes, Model } = require('sequelize');
const { join } = require('node:path');
const constPath = join(__dirname, '..', 'constants', 'paths.js');
const { databasePath } = require(constPath);
const sequelize = require(databasePath);

class Poke extends Model {
	static idList = new Set();

	static generateID() {
		const newId = Math.floor(Math.random() * 100000);
		if (Poke.idList.size >= 100000) throw 'Error: Poke storage limit reached';
		return Poke.idList.has(newId) ? Poke.generateID() : newId;
	}

	static generateTimeDelay() {
		const minHrs = 24;
		const maxHrs = 120;
		const generatedTime = (
			((Math.random() * (maxHrs - minHrs)) // Random generate max-min
				+ minHrs)	// + minimum hrs
		//	* 60 		// to minutes
		//	* 60 		// to seconds
			* 1000		// to milliseconds
		);
		console.log(`Generated time: ${generatedTime}`);
		return generatedTime;
	}

	static getTimeLeft(timeout) {
		return Math.ceil((timeout._idleStart + timeout._idleTimeout - Date.now()) / 1000);
	}

	activate(client) {
		const pokeChannel = client.channels.resolve(this.channelID);
		console.log(`Poke ${this.ID} activated: @${this.targetID}, by ${this.authorID}, message: ${this.message}`);
		const timeDelay = this.remainingTime
			? this.remainingTime
			: Poke.generateTimeDelay();
		const pokemessage = this.message? this.message : ':point_left:';
		this.timeout = setTimeout(() => {
			pokeChannel.send(`Poke ID ${this.ID}: <@${this.targetID}> ${pokemessage}`);
			this.remainingTime = null;
			// client.emit()
		}, timeDelay);
		if (!Poke.idList.has(this.pokeID)) {Poke.idList.add(this.pokeID);}
		return this.timeout;
	}

	pauseAndUpdate() {
		const currRemainingTime = Poke.getTimeLeft(this.timeout);
		this.update({ remainingTime: currRemainingTime });
		clearTimeout(this.timeout);
	}

	remove() {
		Poke.idList.delete(this.pokeID);
		clearTimeout(this.timeout);
		this.destroy();
	}

}
Poke.init({
	pokeID: {
		type: DataTypes.INTEGER,
		allowNull: false,
		unique: true,
	},
	authorID: { type: DataTypes.STRING, allowNull: false },
	channelID: { type: DataTypes.STRING, allowNull: false },
	targetID: { type: DataTypes.STRING, allowNull: false },
	message: { type: DataTypes.TEXT },
	remainingTime: { type: DataTypes.INTEGER },
}, {
	sequelize,
	modelName: 'Poke',
});

// Poke.sync().then(() => {console.log('Sync done');});
module.exports = Poke;