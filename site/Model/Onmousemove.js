var Onmousemove = function (ctx, x, y, game) {
	this.game = game;
	this.x = x;
	this.y = x;
	this.show = true;
	this.render = function (){
		if (this.show) {
			var poss = this.getBlock();
			ctx.beginPath();
			ctx.globalAlpha=0.2;
	    	ctx.fillRect( (poss.x  * Tile.SCALE_SIZE()) - this.game.world.offset.x, (poss.y  * Tile.SCALE_SIZE()) - this.game.world.offset.y, Tile.SCALE_SIZE(), Tile.SCALE_SIZE());
	    	ctx.fillStyle = "red";
			ctx.fill();
			ctx.globalAlpha=1;
		}
    }
    this.getBlock = function () {

		var realX = Math.floor((this.x + this.game.world.offset.x) / Tile.SCALE_SIZE());
 		var realY = Math.floor((this.y + this.game.world.offset.y) / Tile.SCALE_SIZE());
   		return {"x": realX, "y": realY};
    }
}