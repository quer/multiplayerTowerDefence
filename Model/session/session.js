var mapObj = require("./map");
/*
 * session
 */
module.exports = function (map, user, name, id) {
	this.id = id;
	this.name = name;
	this.mapInfo = map;
	this.host = user;
	this.mapName = map.mapName;
	this.lobby = [];
	for (var i = 0; i < map.players.spawn.length; i++) {
		this.lobby.push({
			"x":map.players.spawn[i].x,
    		"y":map.players.spawn[i].y,
    		"color": map.players.spawn[i].color,
    		"user": ((i == 0)? user : null)
		});
	};
	this.map = null;
	this.buildMap = function () {
		this.map = new mapObj(this.mapInfo);
	}
	this.buildOverview = function () {
		return {
			"id":this.id,
			"name":this.name,
			"host": this.host.name, 
			"map": this.mapName, 
			"slot": this.lobby.length, 
			"freeSlots": this.freeSlots()
		};
	}
	this.buildGameMenu = function () {
		var returnObj = {
			"map": {
				"Design": this.mapInfo.map,
				"height": this.mapInfo.height,
				"width": this.mapInfo.width,
				"tilesets" : this.mapInfo.tilesets
			},
			"lobby": this.buildLobbyToUser(),
			"mapName": this.mapName,
			"name":this.name
		};
		return returnObj;
	}
	this.joinFreeLobbySlot = function (user) {
		for (var i = 0; i < this.lobby.length; i++) {
			if (this.lobby[i].user == null) {
				this.lobby[i].user = user;
				return true;
			};
		}
		return false;
	}
	this.joinColorAndRemoveFromOld = function (user, color) {
		for (var i = 0; i < this.lobby.length; i++) {
			if (this.lobby[i].user != null && this.lobby[i].user.name == user.name) {
				this.lobby[i].user = null;
			}
			if (this.lobby[i].color == color && this.lobby[i].user == null) {
				this.lobby[i].user = user;
			}
		}
	}
	this.emitGameMenuToAll = function (blacklistUser) {
		if (typeof blacklistUser === 'undefined') {
			blacklistUser = null;
		};
		
		var gameMenu = this.buildLobbyToUser();
		for (var i = 0; i < this.lobby.length; i++) {
			if(this.lobby[i].user != null && (blacklistUser == null || this.lobby[i].user.name != blacklistUser.name)){
				this.lobby[i].user.emit("GameMenuUpdate", gameMenu);
			}
		};
	}

	/* only used local fun */
	this.freeSlots = function () {
		var free = 0;
		for (var i = 0; i < this.lobby.length; i++) {
			if(this.lobby[i].user != null){
				free++;
			}
		};
		return free;
	}
	this.buildLobbyToUser = function () {
		var newLobby = [];
		for (var i = 0; i < this.lobby.length; i++) {
			newLobby.push({
				"x":this.lobby[i].x,
	    		"y":this.lobby[i].y,
	    		"color": this.lobby[i].color,
	    		"user": ((this.lobby[i].user != null)? this.lobby[i].user.name : null)
			});
		};
		return newLobby;
	}
}