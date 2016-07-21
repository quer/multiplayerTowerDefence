var socket = io.connect();

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
        //console.log(data.sessionList);
        var tableData = $("#serverList");
        for (var i = 0; i < data.sessionList.length; i++) {
          tableData.append("<tr>"
            +"<td>"+data.sessionList[i].name+"</td>"
            +"<td>"+data.sessionList[i].host+"</td>"
            +"<td>"+data.sessionList[i].map+"</td>"
            +"<td>"+data.sessionList[i].freeSlots+" / "+data.sessionList[i].slot+"</td>"
            +"<td><button serverId=\""+data.sessionList[i].id+"\">Join</button></td>"
            +"</tr>"); 
        };
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
      
      console.log(data);
      updateGameMenu(data.gameMenu.lobby);
      buildMineMenuMap(data.gameMenu.map);
    };
  });
});
$("#servers").on("click", "#sCreate", function () {
  socket.emit('creatSession', $("#sName").val(), function (data) {
    if (data.status) {
      $( "#servers" ).hide();
      $( "#GameMenu" ).show();
      $( "#chat" ).show();
      console.log(data);
      updateGameMenu(data.gameMenu.lobby);
      buildMineMenuMap(data.gameMenu.map);
    }else{
      console.log(data.text);
    }
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
/**
 * fra server
 */
socket.on('GameMenuUpdate', function(data) {
  updateGameMenu(data);
  console.log("updateGameMenu");
});

socket.on('chat', function(data) {
  $('#messages').append($('<li>').text(data.from+": "+data.text));
  console.log(data);
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
  console.log(latency);
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
function buildMineMenuMap (mapData) {
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
  // clear the viewport
  /*ctx.clearRect(0,0, 384, 384);
  ctx.restore();*/
}
function getTileplace (tileNr, tilesets) {
  var returnY = Math.floor(tileNr / 6);
  var returnX =  tileNr - (returnY * 6);
  return {x: returnX, y: returnY};

}