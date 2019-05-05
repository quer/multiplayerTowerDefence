var wave = require("./wave");
var building = require("./building");
var Clone = require('./fun');
/*
 * map
 */
module.exports = function (map, lobby, difficulty) {
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
					"gold": map.setting.startGold,
					"buildings": []
					
				});
		}
	}
	this.life = Math.round(map.setting.life * map.difficulty[difficulty].multiply.Life);
	this.waves = [];
	this.igangWave = null;
	var currentCollissionForPathFinder = GenerateCollissionMapFor(this.collission, this.map.width, this.playerData); //have to be extern, doent have it methode yet
	for (var i = 0; i < map.wave.length; i++) {
		this.waves.push(new wave(map.wave[i], map.mobSpawn, i, map.end, currentCollissionForPathFinder));
	}
	this.availableBuilding = [];
	for (var i = 0; i < map.buildings.length; i++) {
		this.availableBuilding.push(new building(map.buildings[i]));
	}
	this.difficulty = map.difficulty[difficulty];
	this.buildStartData = function () {
		return {"map": this.mapData, "life" : this.life, "gold": this.mapData.setting.startGold,"wave": this.igangWave};
	};
	this.buildUpdate = function() {
		var buildings = [];
		for (var i = 0; i < this.playerData.length; i++) {
			buildings = buildings.concat(this.playerData[i].buildings);
		}
		for (var i = 0; i < this.playerData.length; i++) {
			console.log(this.playerData[i].user.name+" build");
			this.emitSinkel(this.playerData[i].user, "LiveGameUpdate", {"buildings": buildings, "gold":this.playerData[i].gold, "life": this.life, "wave": this.igangWave.GetMobs()})
		}
	};
	this.update = function (delta) {
		if (this.igangWave != null) {
			this.igangWave.update(delta);
		}else{
			console.log("start wave!");
			this.startNextWave(delta);
		}
	}
	this.addbuilding = function(name, x, y, user) {
		console.log("NewBuilding map start");
		var building = null
		for (var i = 0; i < this.availableBuilding.length; i++) {
			if (this.availableBuilding[i].name == name) {
				building = this.availableBuilding[i];
				break;
			}
		}
		if (building != null && !this.buildingExist(x, y)) {
			console.log("NewBuilding found and not exist");
			var foundUser = this.findUser(user);
			if (foundUser != null && foundUser.gold >= building.cost) {
				console.log("NewBuilding crafting!");
				var cloneForNewBuilding = new Clone(building);
				cloneForNewBuilding.x = x;
				cloneForNewBuilding.y = y;
				foundUser.gold -= building.cost;
				foundUser.buildings.push(cloneForNewBuilding);
				console.log("NewBuilding done!");
				this.buildUpdate();
				//return true;
			}else{
				console.log("NewBuilding error no user or gold!");
			}
		}
		//return false;
	}
	this.findUser = function (user) {
		for (var i = 0; i < this.playerData.length; i++) {
			if (this.playerData[i].user.name == user.name) {
				return this.playerData[i];
			}
		}
		return null;
	}
	this.buildingExist = function(x, y) {
		for (var i = 0; i < this.playerData.length; i++) {
			for (var ii = 0; ii < this.playerData[i].buildings.length; ii++) {
				if(this.playerData[i].buildings[ii].x == x && this.playerData[i].buildings[ii].y == y){
					return true;
				}
			}
		}
		return false;
	}
	this.emitSinkel = function (user, name, data) {
		user.emit(name, data);	
	}

	this.startNextWave = function(delta) {
		var nextwaveid = 0;
		if (this.igangWave != null) {
			nextwaveid = ++this.igangWave.id;
		}
		
		if (nextwaveid + 1 > this.waves.length) {
			this.igangWave = null;
			this.Afslut();
			return;
		}
		var wave = this.waves[nextwaveid];
		this.igangWave = wave;
		wave.build();
		wave.start(delta);
	}
	this.Afslut = function () {
		// TODO: end game
		console.log("game end!");
	}
	this.GenerateCollissionMapFor = function () {
		 return GenerateCollissionMapFor(this.collission, this.map.width, this.playerData);
	}
}
function GenerateCollissionMapFor(collission, mapWidth, playerData) {
	var grid = [];
	var rowMatrix  = [];
	for (var i = 0; i < collission.data.length; i++) {
		var rowNumber = collission.data[i];
		if(rowNumber == 2){
			rowMatrix.push(0);
		}else{
			rowMatrix.push(1);
		}
		if(i % mapWidth == 0){
			grid.push(rowMatrix);
			rowMatrix = [];
		}
	}
	for (var i = 0; i < playerData.length; i++) {
		for (var ii = 0; ii < playerData[i].buildings.length; ii++) {
			var building = playerData[i].buildings[ii];
			grid[building.x][building.y] = 1;
		}
	}
	return rowMatrix;
}