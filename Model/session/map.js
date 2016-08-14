var wave = require("./wave");
var building = require("./building");
/*
 * map
 */
module.exports = function (map, lobby, level) {
	this.collission = map.collission;
	this.map = map.map;
	this.mapData = map;
	this.playerData = [];
	for (var i = 0; i < lobby.length; i++) {
		if (lobby[i].user != null) {
			this.playerData.push(
				{
					"color": lobby[i].color,
					"user": lobby[i].user,
					"gold": map.setting.gold 
					
				});
		}
	}
	this.life = setting.life * map.level[level];
	this.waves = [];
	this.igangWave = null;
	for (var i = 0; i < map.wave.length; i++) {
		this.waves.push(new wave(map.wave[i]));
	};
	this.availableBuilding = [];
	for (var i = 0; i < map.wave.length; i++) {
		this.availableBuilding.push(new building(map.buildings[i]));
	};
	this.level = map.level[level];
	this.buildStartData = function () {
		return {"map": this.mapData, "life" : this.life, "gold": map.setting.gold };
	}
	this.update = function (delta) {
		// body...
	}
}