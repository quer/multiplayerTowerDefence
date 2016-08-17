var World = function (map, ctx, start) {
	this.map = map;
	this.ctx = ctx;
	this.offset = {
		x:((start.x * Tile.SCALE_SIZE())-(Window.x/2)),
		y:((start.y * Tile.SCALE_SIZE())-(Window.y/2))
	}
	//this.image = document.getElementById("deadmaul_image");
	this.image = Images.get("deadmaul");
	this.render = function (){ // x og y startpunkter
			var offset = 2;
			var getNearstBlock = this.getNearstBlock(this.offset.x, this.offset.y);
			var xStart = (getNearstBlock.x - offset);
			var yStart = (getNearstBlock.y - offset);
			//console.log("Start : y: "+ yStart + " x: "+ xStart);
			var xEnd = Math.ceil(Window.x / Tile.SCALE_SIZE()) + xStart + (offset * 2);
			var yEnd = Math.ceil(Window.x / Tile.SCALE_SIZE()) + yStart + (offset * 2);
			if (xEnd > this.map.width) {
				xEnd = this.map.width;
			};
			if (yEnd > this.map.height) {
				yEnd = this.map.height;
			};
			//console.log("End : y: "+ yEnd + " x: "+ xEnd);
		for (var i = xStart; i < xEnd; i++) {
		    for (var ii = yStart; ii < yEnd; ii++) {
		      	//var index = i*this.map.width + ii;
		      	//var tileNr = this.map.map.data[index];
		      	var tileNr = this.getBlock(i, ii);
		      	var tileSheetPoss = getTileplace(tileNr, this.map.tilesets);
		      	//console.log("tileSheetPoss"+tileSheetPoss + " x:"+ Math.abs(ii*Tile.SCALE_SIZE()) + " y:"+Math.abs(i*Tile.SCALE_SIZE()))
		      	this.ctx.drawImage(this.image, tileSheetPoss.x * this.map.tilesets.tilewidth, tileSheetPoss.y * this.map.tilesets.tileheight, this.map.tilesets.tilewidth, this.map.tilesets.tileheight, Math.abs(i*Tile.SCALE_SIZE()) - this.offset.x, Math.abs(ii*Tile.SCALE_SIZE()) - this.offset.y, Tile.SCALE_SIZE(), Tile.SCALE_SIZE());
		    };
		};
	}
	this.getTileplace = function (tileNr) {
		var tilesAmountx = 6;
	    var returnY = Math.floor(tileNr / tilesAmountx);
	    var returnX =  tileNr - (returnY * tilesAmountx);
	    return {x: returnX, y: returnY};
	}
	this.getCollision = function (x, y) {
    	return this.map.collission.data[((y * this.map.width) + x)] - this.map.collission.firstgid;
    }
    this.getBlock = function (x, y) {
    	return this.map.map.data[((y * this.map.width) + x)] - this.map.map.firstgid;
    }
    this.getNearstBlock = function (x, y) {

		var realX = Math.floor(x / Tile.SCALE_SIZE());
 		var realY = Math.floor(y / Tile.SCALE_SIZE());
   		return {"x": realX, "y": realY};
    }
}