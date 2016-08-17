var Click = function (ctx, game) {
	this.game = game;
	this.ctx = ctx;
	this.clicked = null;
	// click items
	this.items = [];
	// board building - for easy replace 
	this.buildings = [];
     /**
	 * obj must have a .selected metode - for when selecket
	 * obj must have a .used metode. - for when place on map
     */
    this.addItem = function (x, y, width, height, folowMap, obj) {
    	this.items.push({
    		x: x,
    		y: y,
    		width: width,
    		height: height,
    		folowMap: folowMap,
    		obj: obj
    	})
    	return this.items.length-1;
    }
    this.addBuilding = function (buildings) {
    	this.buildings = buildings;
    }
    this.click = function (x, y) {
    	var clickChosen = false;
    	for (var i = 0; i < this.items.length; i++) {
			var item = this.items[i];
			var mouseLoopUp = {
				x: x,
				y: y
			}
			if (item.folowMap) {
				mouseLoopUp.x + this.game.world.offset.x;
				mouseLoopUp.y + this.game.world.offset.y;
			}
			if (item.x < mouseLoopUp.x && item.x + item.width > mouseLoopUp.x && item.y < mouseLoopUp.y && item.y + item.height > mouseLoopUp.y) {
				if(item.obj.selected()){
					this.clicked = item;
				}
				clickChosen = true;
			}
		}
		if (!clickChosen && this.clicked != null) {
			if(this.clicked.obj.used(x, y)){
				this.clicked = null;
			}
		}
    }
}