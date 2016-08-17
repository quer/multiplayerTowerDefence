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
	this.buildMap = function (level) {
		this.map = new mapObj(this.mapInfo, this.lobby, level);
	}
	this.igang = false;
	this.Ready = [];
	this.buildOverview = function () {
		return {
			"id":this.id,
			"name":this.name,
			"host": this.host.name, 
			"map": this.mapName, 
			"slot": this.lobby.length, 
			"usedSlots": this.usedSlots()
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
		
		this.emitSession("GameMenuUpdate", gameMenu, blacklistUser)
	}
	this.chat = function (text, name) {
		this.emitSession("chat", {"from": name, "text": text}, null);
	}

	/* only used local fun */
	this.usedSlots = function () {
		var used = 0;
		for (var i = 0; i < this.lobby.length; i++) {
			if(this.lobby[i].user != null){
				used++;
			}
		};
		return used;
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
	this.emitSession = function (name, data, blacklistUser) {
		if (typeof blacklistUser === 'undefined') {
			blacklistUser = null;
		};
		for (var i = 0; i < this.lobby.length; i++) {
			if(this.lobby[i].user != null && (blacklistUser == null || this.lobby[i].user.name != blacklistUser.name)){
				//this.lobby[i].user.emit(name, data);
				this.emitSessionSinkel(this.lobby[i].user, name, data);
			}
		};
	}
	this.emitSessionSinkel = function (user, name, data) {
		user.emit(name, data);	
	}
	this.startCountdown = function(level) {
		console.log("game will Start");
		this.chat("Game will start", "Server");
		this.start(level);
		/* for count down */
		/*var i = 10;
		var that = this;
		var interval = setInterval(function(){
			that.chat("Game will start in "+ i +" sec", "Server");
			--i;
			if(i <= 0){
      			clearInterval(interval);
      			console.log("game Start");
      			that.start();
    		}
  		},1000);*/
	}
	this.start = function(level) {
		this.buildMap(level);
		//this.emitSession('startGame', {"start":true});
		for (var i = 0; i < this.lobby.length; i++) {
			if (this.lobby[i].user != null) {
				this.emitSessionSinkel(this.lobby[i].user,'startGameData', {"map": this.map.buildStartData(), "start" : {"x": this.lobby[i].x, "y": this.lobby[i].y, "color": this.lobby[i].color} });
			}
		}
		//this.emitSession('startGameData', {"map": this.map.buildStartData(), "start" });
	}
	this.checkReady = function () {
		if (this.usedSlots() == this.Ready.length) {
			this.igang = true;
			this.emitSession('startGameAllready', {"start":true});
		}
	}
	/* akriv game */
	this.update = function(delta) {
		if (this.map != null) {
			if (this.igang) {
				//console.log("update akriv game");
				this.map.update(delta);
			}else{
				console.log("checker game");
				this.checkReady();
			}
		}
	}
	this.addAktivePlayer = function(user) {
		var allreadyAktive = false;
		for (var i = this.Ready - 1; i >= 0; i--) {
			if(this.Ready[i] = user){
				allreadyAktive = true;
				break;
			}
		}
		if (!allreadyAktive) {
			this.Ready.push(user);
		}
	}
	this.addbuilding = function(name, x, y, user) {
		if (this.igang) {
			console.log("NewBuilding session start");
			this.map.addbuilding(name, x, y, user);
		}
	}
}