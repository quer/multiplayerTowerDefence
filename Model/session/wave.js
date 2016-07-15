var mobSpawn = require("./mob/mobSpawn");
/*
 * wave
 */
module.exports = function (wave) {
	this.wave = wave;
	this.reward = wave.reward;
	this.mobSpawn = [];
	for (var i = 0; i < wave.mobsSpawn.length; i++) {
		this.mobSpawn.push(new mobSpawn(wave.mobsSpawn[i]));
	};
	
	this.update = function (delta) {
		// body...
	}
}