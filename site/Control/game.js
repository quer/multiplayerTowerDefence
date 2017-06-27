var can = document.getElementById('game');
var	ctx = can.getContext('2d');
var key = {
  "left": false,
  "right": false,
  "up": false,
  "down": false,
  "z": false,
  "x": false
}
var Game = function (NewGameData, start) {
    console.log(NewGameData);
    this.gameData = NewGameData
    this.map = NewGameData.map;
    this.life = NewGameData.life;
    this.gold = NewGameData.gold;
    this.wave = NewGameData.wave;
    this.ctx = ctx;
    this.world = new World(this.map, this.ctx, start);
    this.gameBuilding = new gameBuilding(this.ctx, this);
    this.delta = 0;
    this.mouse = new mouse(this.ctx, this);
    this.interface = new interface(this.ctx, this);
    this.buildings = [];
    
    this.load = function () {
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.width = Window.x;
        this.ctx.height = Window.y;
    }
    this.update = function() {
        var movePixel = 20;
        if (key.left) {
            this.world.offset.x -= movePixel;
        }else if (key.right){
            this.world.offset.x += movePixel;
        }
        if (key.up) {
            this.world.offset.y -= movePixel;
        }else if (key.down){
            this.world.offset.y += movePixel;
        }
    }
    this.render = function() {
        var start = Date.now();
        this.ctx.fillStyle="black";
        this.ctx.save();
        //this.ctx.translate(this.world.offset.x, this.world.offset.y);
        // clear the viewport
        //this.ctx.clearRect(this.world.offset.x,this.world.offset.y, Window.x, Window.y);
        this.ctx.translate(0, 0);
        // clear the viewport
        this.ctx.clearRect(0, 0, Window.x, Window.y);

            this.world.render();
            this.gameBuilding.render();
            this.interface.render();
            this.mouse.render();
            
        this.ctx.restore();

        var end = Date.now();
        this.ctx.font = '16px sans-serif'
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Rendered in ' + (end - start) + ' ms', can.width / 2, can.height - 35);
        this.ctx.fillText('Ping ' + latency + ' ms', can.width / 2, can.height - 20);
    }
    this.LiveGameUpdate = function (data) {
        //{"buildings": "", "gold":"", "life": "", "wave": ""}
        console.log(data);
        this.wave = data.wave;
        this.gold = data.gold;
        this.life = data.life;
        this.buildings = data.buildings;
        this.mouse.click.addBuilding(data.buildings);
    }
}
var GameLoopClass = function(game) {
    this.game = game;
    this.gameLoop = null;
    this.fps = 1000 / 10;
    this.startGame = function () {
        this.game.load();
        if (this.gameLoop == null) {
            this.gameLoop = setInterval(this.mainloop, this.fps);
            console.log("game start");
        }
    }
    this.stopGame =  function () {
        console.log("stopGame");
        clearInterval(this.gameLoop);
        this.gameLoop = null;
    }
    var that = this;
    this.mainloop = function() {
        that.game.delta++;
        that.game.update();
        that.game.render();
    }
}
window.addEventListener('keydown', function(e) {
    
    switch (e.keyCode) {
        case 37:
            key.left = true;
            break;
        case 39:
            key.right = true;
            break;
        case 38:  
            key.up = true;
            break;
        case 40:
            key.down = true;
            break;
    }
}, false);
window.addEventListener('keyup', function(e) {
    switch (e.keyCode) {
        case 37:
          key.left = false;
          break;
        case 39:
          key.right = false;
          break;
        case 38:
          key.up = false;
          break;
        case 40:
          key.down = false;
          break;
    }
}, false);
can.onclick = function(e){
    var x = e.pageX - this.offsetLeft; 
    var y = e.pageY - this.offsetTop;
    game.mouse.click.click(x, y);
    //console.log("x: "+ x + " y: " + y);
};
can.onmousemove = function(e) {
    var x = e.pageX - this.offsetLeft; 
    var y = e.pageY - this.offsetTop;
    //console.log("x: "+x +" y: "+y );
    game.mouse.Onmousemove.x = x;
    game.mouse.Onmousemove.y = y;
    game.mouse.Onmousemove.show = true;
}
can.oncontextmenu = function() {
    if (game != null) {
        game.mouse.click.clicked = null;
    } 
    return false; 
}