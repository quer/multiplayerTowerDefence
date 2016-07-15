var can = document.getElementById('game');
var	ctx = can.getContext('2d');

var game = {
    playerData: {},
    world: "",
    started: false,
    text: null,
	load: function (can, ctx) {
        ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.msImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;
	},
    update: function () {
    },
    render: function (ctx) {
        var start = Date.now();
        ctx.fillStyle="black";
		ctx.save();
        ctx.translate(-0 + -(Camera.worldXOffset * (Tile.REAL_SIZE())), -0 + -(Camera.worldYOffset * (Tile.REAL_SIZE())));
        // clear the viewport
        ctx.clearRect(-0 + -(Camera.worldXOffset * (Tile.REAL_SIZE())), -0 + -(Camera.worldYOffset * (Tile.REAL_SIZE())), Window.SCALE_WIDTH(), Window.SCALE_HEIGHT());
		

			World.render(ctx, 0 + Camera.worldXOffset, 0 + Camera.worldYOffset , 0);
            World.render(ctx, 0 + Camera.worldXOffset, 0 + Camera.worldYOffset , 1);
		ctx.restore();

        var end = Date.now();
        ctx.font = '16px sans-serif'
        ctx.textAlign = 'center';
        ctx.fillText('Rendered in ' + (end - start) + ' ms', can.width / 2, can.height - 20);
	}
}
//game.load(can, ctx);

var fps = 1000 / 30 ;
var delta = 0;
var mainloop = function() {
	delta++;
	game.render();
};
var gameLoop = null;
function startGame () {
    if (gameLoop == null) {
        gameLoop = setInterval(mainloop, fps);
        console.log("game start");
    };
}
function stopGame () {
    console.log("stopGame");
	clearInterval(gameLoop);
    gameLoop = null;
}