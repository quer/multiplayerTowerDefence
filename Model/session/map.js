var wave = require("./wave");
var building = require("./building");
/*
 * map
 */
module.exports = function (map) {
	this.collission = map.collission;
	this.map = map.map;
	this.mapData = map;
	this.waves = [];
	this.igangWave = null;
	for (var i = 0; i < map.wave.length; i++) {
		this.waves.push(new wave(map.wave[i]));
	};
	this.availableBuilding = [];
	for (var i = 0; i < map.wave.length; i++) {
		this.availableBuilding.push(new building(map.buildings[i]));
	};
	this.level = map.level;
	this.valgtLevel = null;
	this.buildStartData = function () {
		return {"map": this.mapData };
	}
	this.update = function (delta) {
		// body...
	}
}