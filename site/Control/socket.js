var socket = io.connect();
var latency = 0;
var game = null;
var gameLoopObj = null;
/**
* Login page
*/
$("#bLogin").click(function() {
  socket.emit('login', $("#iLogin").val(), function(data){
    if (data.status != false) {
        console.log("user log ind");
        console.log(data.text);
        $( "#login" ).hide();
        $( "#servers" ).show();
        buildSessionList(data.sessionList)
    }else{
        console.log(data.text);
    }
  });
});
/**
 * Server list page
 */
$("#servers").on("click", "#serverList button", function () {
  var serverId = $(this).attr("serverId");
  console.log(serverId);
  socket.emit('joinSession', serverId, function (data) {
    if (data.status != false) {
      $( "#servers" ).hide();
      $( "#GameMenu" ).show();
      $( "#chat" ).show();
      //console.log(data);
      updateGameMenu(data.gameMenu.lobby);
      buildMineMenuMap(data.gameMenu);
    };
  });
});
$("#servers").on("click", "#sCreate", function () {
  socket.emit('creatSession', $("#sName").val(), function (data) {
    if (data.status) {
      $( "#servers" ).hide();
      $( "#GameMenu" ).show();
      $( "#chat" ).show();
      $( "#GMStart" ).show();
      for (var i = 0; i < data.level.length; i++) {
        $( "#GMStart" ).append("<button nr=\""+i+"\">"+data.level[i].name+"</button>");
      }
      //console.log(data);
      updateGameMenu(data.gameMenu.lobby);
      buildMineMenuMap(data.gameMenu);
    }else{
      console.log(data.text);
    }
  });
});
$("#servers").on("click", "#sRefresh", function (data) {
  socket.emit('sessionList', function (data) {
    buildSessionList(data);
  });
});
/**
 * chat
 */
 $('form').submit(function(){
  socket.emit('chat', $('#m').val());
  $('#m').val('');
  return false;
});
/**
 * Game menu page
 */
$("#GameMenu").on("click", "#GameMenuList button", function () {
  var color = $(this).attr("color");
  console.log(color);
  socket.emit('MenuLobbyChance', color, function (data) {
    if (data.status != false) {
      updateGameMenu(data.gameMenu);
    };
  });
});
$("#GameMenu").on("click", "#GMStart button", function () {
  var nr = $(this).attr("nr");
  socket.emit('startSession' , nr);
});
/**
 * fra server
 */
socket.on('GameMenuUpdate', function(data) {
  updateGameMenu(data);
  console.log("updateGameMenu");
});

socket.on('chat', function(data) {
  addTextChat(data.from, data.text);
});
socket.on('startGameData', function(data) {
  $( "#servers" ).hide();
  $( "#GameMenu" ).hide();
  $( "#GMStart" ).hide();
  $("#game").show();
  game = new Game(data.map, data.start);
  gameLoopObj = new GameLoopClass(game);
  gameLoopObj.startGame();
  socket.emit('addAktivePlayer');
});
socket.on('LiveGameUpdate', function(data) {
  console.log(data);
  game.LiveGameUpdate(data);
});
/**
* Ping test 
*/
var startTime;
setInterval(function() {
  startTime = Date.now();
  socket.emit('ping');
}, 2000);
socket.on('pong', function() {
  latency = Date.now() - startTime;
});
function updateGameMenu (lobbyData) {
  var GameMenuList = $("#GameMenuList");
  GameMenuList.html("");
  for (var i = 0; i < lobbyData.length; i++) {
    GameMenuList.append("<tr>"
      +"<td>"+((lobbyData[i].user == null)? "Open" : lobbyData[i].user)+"</td>"
      +"<td style=\"background-color: "+lobbyData[i].color+"; width: 10px; \" ></td>"
      +((lobbyData[i].user == null)? "<td><button color=\""+lobbyData[i].color+"\">Join</button></td>" : "<td></td>")
      +"</tr>"); 
  };
}
function buildMineMenuMap (data) {
  mapData = data.map;
  var can = document.getElementById('gameMenuMap');
  can.width = "384";
  can.height = "384";
  var ctx = can.getContext('2d');
  ctx.fillStyle="white";
  //ctx.save();
  //ctx.translate(0, 0);
  console.log(mapData);
  var image = document.getElementById("deadmaul_image");
  for (var i = 0; i < mapData.height; i++) {
    for (var ii = 0; ii < mapData.width; ii++) {
      var index = i*mapData.width + ii;
      var tileNr = mapData.Design.data[index];
      var tileSheetPoss = getTileplace(tileNr-1, mapData.tilesets);
      ctx.drawImage(image, tileSheetPoss.x * mapData.tilesets.tilewidth, tileSheetPoss.y * mapData.tilesets.tileheight, mapData.tilesets.tilewidth, mapData.tilesets.tileheight, Math.abs(ii*4), Math.abs(i*4), 4, 4);
    };
  };
  for (var i = data.lobby.length - 1; i >= 0; i--) {
    var x = data.lobby[i].x * 4;
    var y = data.lobby[i].y * 4;

    ctx.beginPath();
    ctx.moveTo(x - 10, y + 10);
    ctx.lineTo(x + 10, y - 10);
    ctx.moveTo(x + 10, y + 10);
    ctx.lineTo(x - 10, y - 10);
    ctx.strokeStyle = data.lobby[i].color;
    ctx.stroke();
    
  }
  // clear the viewport
  /*ctx.clearRect(0,0, 384, 384);
  ctx.restore();*/
}
function getTileplace (tileNr, tilesets) {
  var returnY = Math.floor(tileNr / 6);
  var returnX =  tileNr - (returnY * 6);
  return {x: returnX, y: returnY};

}
function addTextChat(from, text) {
  $('#messages').append($('<li>').text(from+": "+text));
  //console.log(data);
}
function buildSessionList(data) {
  var tableData = $("#serverList");
  for (var i = 0; i < data.length; i++) {
    tableData.append("<tr>"
      +"<td>"+data[i].name+"</td>"
      +"<td>"+data[i].host+"</td>"
      +"<td>"+data[i].map+"</td>"
      +"<td>"+data[i].usedSlots+" / "+data[i].slot+"</td>"
      +"<td><button serverId=\""+data[i].id+"\">Join</button></td>"
      +"</tr>"); 
  };
}