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
			/*var offset = 0;
			var xStart = (xRender - offset);
			var yStart = (yRender - offset);
			//console.log("Start : y: "+ yStart + " x: "+ xStart);
			var xEnd = Math.ceil(Window.x / Tile.SIZE) + xStart + (offset * 2);
			var yEnd = Math.ceil(Window.x / Tile.SIZE) + yStart + (offset * 2);
			if (xEnd > this.map.width) {
				xEnd = this.map.width;
			};
			if (yEnd > this.map.height) {
				yEnd = this.map.height;
			};*/
		for (var i = 0; i < this.map.height; i++) {
		    for (var ii = 0; ii < this.map.width; ii++) {
		      	var index = i*this.map.width + ii;
		      	var tileNr = this.map.map.data[index];
		      	var tileSheetPoss = getTileplace(tileNr-1, this.map.tilesets);
		      	//console.log("tileSheetPoss"+tileSheetPoss + " x:"+ Math.abs(ii*Tile.SCALE_SIZE()) + " y:"+Math.abs(i*Tile.SCALE_SIZE()))
		      	this.ctx.drawImage(this.image, tileSheetPoss.x * this.map.tilesets.tilewidth, tileSheetPoss.y * this.map.tilesets.tileheight, this.map.tilesets.tilewidth, this.map.tilesets.tileheight, Math.abs(ii*Tile.SCALE_SIZE()) - this.offset.x, Math.abs(i*Tile.SCALE_SIZE()) - this.offset.y, Tile.SCALE_SIZE(), Tile.SCALE_SIZE());
		    };
		};
	}
	this.getTileplace = function (tileNr) {

		var tilesAmountx = 6;
	    var returnY = Math.floor(tileNr / tilesAmountx);
	    var returnX =  tileNr - (returnY * tilesAmountx);
	    return {x: returnX, y: returnY};
	}
}