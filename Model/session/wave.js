var Mob = require("./mob/mob");
/*
 * wave
 */
module.exports = function (wave, mobSpawnList, index, endCord, currentCollissionForPathFinder) {
	this.id = index;
	//this.wave = wave;
	this.reward = wave.reward;
	this.waveSpendTime = wave.waveSpendTime;
	this.startDelta = null;
	this.mobs = [];
	for (var i = 0; i < wave.mobsSpawn.length; i++) {
		var waveSpawn = wave.mobsSpawn[i];
		var spawn = GetMobSpawn(mobSpawnList, waveSpawn.spawn);
		for (var j = 0; j < waveSpawn.mobGroup.length; j++) {
			var mobGroup = waveSpawn.mobGroup[j];
			for (var k = 0; k < waveSpawn.mobGroup[j].amount; k++) {
				this.mobs.push(new Mob(mobGroup, wave.mobsSpawn, endCord, currentCollissionForPathFinder));	
			}
		}
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
function GetMobSpawn(mobSpawnList, name) {
	for (var i = 0; i < mobSpawnList.length; i++) {
		if(mobSpawnList[i].refName == name){
			return mobSpawnList[i];
		}
	}
	console.log("Error: mobSpawn do not exist: " + name);
	return null;
}