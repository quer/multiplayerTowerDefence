var Clone = require('./Model/session/fun');
var playerObj = require("./Model/player");
var SessionController = require("./Controller/sessionController");
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = 3000;

var normalizedPath = require("path").join(__dirname, "map");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./map/" + file);
});
//console.log(TileMaps);
//SessionController.newSession(TileMaps.deadmaul, {"name": "test"}, "test map");
//SessionController.newSession(TileMaps.deadmaul, {"name": "test2"}, "test map2");
var players = [];

app.use("/image/", express.static(__dirname + '/image/'));
app.use("/site/", express.static(__dirname + '/site/'));
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/site/index.html');
});
console.log("starter server on port "+port);
server.listen(port);
io.sockets.on('connection', function (socket) {
	console.log("New connection");
	/* debug */
	socket.on('debugSession', function(callback) {
		if(socket.session != null){
			callback(socket.session.map.waves);
		}else
		{
			callback("error");
		}


	});
	/* from active game*/
	socket.on('NewBuilding', function (buildname, x, y) {
		if (socket.session != null) {
			console.log("NewBuilding start");
			socket.session.addbuilding(buildname, x, y, socket);
		}
	});
	/* Game menu */
	socket.on('startSession', function(level) {
		console.log("start session");
		if (socket.session != null && socket.session.host == socket) {
			console.log("start session");
			socket.session.startCountdown(level);
		}
	});
	socket.on('joinSession', function(sessionId, callback) {
	    var session = SessionController.findSession(sessionId);
	    if (session != null) {
	    	if(session.joinFreeLobbySlot(socket)){
	    		socket.session = session;
	    		session.emitGameMenuToAll(socket);
	    		callback({"gameMenu": session.buildGameMenu(), "status":true});
	    	}
	    }else{
	    	callback({"status":false, "text":"du er ikke logget ind!"})
	    }
	});
	socket.on('creatSession', function(name, callback) {
		var session = SessionController.newSession(new Clone(TileMaps.deadmaul),socket, name);
   		socket.session = session;
   		callback({"gameMenu": session.buildGameMenu(), "status" : true, "level": session.mapInfo.level});
	});
	socket.on('MenuLobbyChance', function(color) {
		//console.log(socket.session.lobby);
		socket.session.joinColorAndRemoveFromOld(socket, color);
		//console.log(socket.session.lobby);
		socket.session.emitGameMenuToAll();
	  	console.log("menu updateGameMenu");
	});
	/* menu and ingame */
	socket.on('chat', function(text) {
		if (('session' in socket)) {
			socket.session.chat(text, socket.name);
		}else{
			console.log("user not in session: "+ socket.name);
		}
		
	});
	socket.on('ping', function() {
	    socket.emit('pong');
	});

	socket.on('addAktivePlayer', function() {
	    if(socket.session != null){
	    	socket.session.addAktivePlayer(socket);
	    }
	});
	/* before game menu */
	socket.on('login', function(name, callback) {
		if (!('name' in socket)) {
			if (players[name] == undefined) {
				socket.name = name;
				var newPlayer = new playerObj(socket);
				players[name] = newPlayer;
				console.log(name);
				callback({"status":true,"text":"du er nu loget ind", "sessionList": SessionController.buildList()});
			}else{
				callback({"status":false,"text":"en har allede det navn"});
			}
		}else{
			callback({"status":false,"text":"du er loget ind"});
		}
	});
	socket.on('sessionList', function (callback) {
		callback(SessionController.buildList());
	})
	socket.on('disconnect', function(){
    	if(!socket.name) return;
    	if (players[socket.name] != undefined) {
    		//players[socket.name] == null;
    		players.splice(socket.name, 1);
    	};
		console.log("player dc");
	});
});
/* server loop */
var delta = 0;
var fps = 1000 / 1;
setInterval(function() {
  SessionController.update(delta);
  ++delta;
}, fps);

