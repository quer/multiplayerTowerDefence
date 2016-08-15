var hover = function (ctx, game) {
	this.ctx = ctx;
	this.game = game;
	this.show = true;
	this.items = [];
	this.render = function (){
		if (this.show) {
			for (var i = 0; i < this.items.length; i++) {
				if (true) {}
				var item = this.items[i];
				ctx.beginPath();
		    	ctx.fillStyle = "black";
		    	ctx.fillRect( item.x, item.y, item.width, item.height);
				ctx.fill();
				ctx.font = "16px Arial";
				if (Array.isArray(item.text)) {
					for (var ii = 0; ii < item.text.length; ii++) {
						ctx.fillText(item.text[ii] , item.x, 20*ii);
					}
				}
			}
		}
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