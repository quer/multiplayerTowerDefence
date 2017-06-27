var mobSpawn = require("./mob/mobSpawn");
/*
 * wave
 */
module.exports = function (wave, mobSpawnList, index) {
	this.id = index;
	//this.wave = wave;
	this.reward = wave.reward;
	this.waveSpendTime = wave.waveSpendTime;
	this.startDelta = null;
	this.mobSpawn = [];
	for (var i = 0; i < mobSpawnList.length; i++) {
		this.mobSpawn.push(new mobSpawn(mobSpawnList[i], wave.mobsSpawn));
	};
	
	this.update = function (delta) {
		for (var i = this.mobSpawn.length - 1; i >= 0; i--) {
			this.mobSpawn[i].update(delta);
		}
	}
	this.start = function (delta) {
		this.startDelta = delta;
	}
	this.build = function () {
		// body...
	}
	this.GetMobs = function () {
		var mobsArray = [];
		for (var i = 0; i < this.mobSpawn.length; i++) {
			mobsArray.push(this.mobSpawn[i].GetMobs());
		}
		return mobsArray;
	}
}