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
		var session = SessionController.newSession(TileMaps.deadmaul,socket, name);
   		socket.session = session;
   		callback({"gameMenu": session.buildGameMenu(), "status":true});
	});
	socket.on('MenuLobbyChance', function(color) {
		console.log(socket.session.lobby);
		socket.session.joinColorAndRemoveFromOld(socket, color);
		console.log(socket.session.lobby);
		socket.session.emitGameMenuToAll();
	  	console.log("menu updateGameMenu");
	});
	socket.on('ping', function() {
	    socket.emit('pong');
	});
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
	socket.on('disconnect', function(){
    	if(!socket.name) return;
    	if (players[socket.name] != undefined) {
    		players[socket.name] == null;
    	};
		console.log("player dc");
	});
});