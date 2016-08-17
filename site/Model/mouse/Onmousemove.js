var Onmousemove = function (ctx, game) {
	this.game = game;
	this.ctx = ctx;
	this.x = 0;
	this.y = 0;
	this.show = false;
	// hover items
	this.items = [];
	this.render = function (){
		if (this.show) {
			var poss = this.getBlock();
			this.ctx.beginPath();
			this.ctx.globalAlpha=0.2;
	    	this.ctx.fillStyle = "red";
	    	if (this.game.world.getCollision(poss.x, poss.y) == 2) {
	    		ctx.fillStyle = "green";
	    	}
	    	this.ctx.fillRect( (poss.x  * Tile.SCALE_SIZE()) - this.game.world.offset.x, (poss.y  * Tile.SCALE_SIZE()) - this.game.world.offset.y, Tile.SCALE_SIZE(), Tile.SCALE_SIZE());
			this.ctx.fill();
			this.ctx.globalAlpha=1;
			for (var i = 0; i < this.items.length; i++) {
				var item = this.items[i];
				var mouseLoopUp = {
					x: this.x,
					y: this.y
				}
				if (item.folowMap) {
					mouseLoopUp.x + this.game.world.offset.x;
					mouseLoopUp.y + this.game.world.offset.y;
				}
				if (item.x < mouseLoopUp.x && item.x + item.width > mouseLoopUp.x && item.y < mouseLoopUp.y && item.y + item.height > mouseLoopUp.y) {
					ctx.beginPath();
			    	ctx.fillStyle = "black";
			    	var boxHeight = 30;
			    	if (Array.isArray(item.text)) {
			    		boxHeight = (item.text.length*20)+10;
			    	}
			    	ctx.fillRect( this.x-200, this.y, 200, boxHeight);
					ctx.fill();
					ctx.font = "16px Arial";
					ctx.fillStyle = "red";
					ctx.textAlign="start";
					if (Array.isArray(item.text)) {
						for (var ii = 0; ii < item.text.length; ii++) {
							ctx.fillText(item.text[ii] , this.x-200, this.y + (20*ii) + 20);
						}
					}else{
						ctx.fillText(item.text, this.x-200, 20);
					}
				}
			}
		}
    }
    this.getBlock = function () {

		var realX = Math.floor((this.x + this.game.world.offset.x) / Tile.SCALE_SIZE());
 		var realY = Math.floor((this.y + this.game.world.offset.y) / Tile.SCALE_SIZE());
   		return {"x": realX, "y": realY};
    }
    
     /**
	 * text can be a array, if more lines
	 * folowMap is like, is it static or dynamick link the game screen
     */
    this.addItem = function (x, y, width, height, text, folowMap) {
    	this.items.push({
    		x: x,
    		y: y,
    		width: width,
    		height: height,
    		text: text,
    		folowMap: folowMap
    	})
    	return this.items.length-1;
    }
}