var building = function (ctx, game) {
	this.game = game;
	this.ctx = ctx;
	this.show = true;
	this.start = {
		x: Window.x - 222,
		y: Window.y - 147
	}
	this.init = function() {
		for (var i = 0; i < this.game.map.buildings.length; i++) {
			var building = this.game.map.buildings[i];
			var index = i;
	    	var extraHeight = 0;
	    	/*if ((i % 3) == 1) {
	    		index -= 3;
	    		extraHeight = 73;
	    	}*/
	    	var x = this.start.x + (index*74);
	    	var y = this.start.y + extraHeight; 
			//x, y, width, height, text
			var nr = this.game.mouse.Onmousemove.addItem(x, y, 62, 62, [building.name, "damage " + building.damage, "cost " + building.cost, "speed " + building.speed], false);
		}
	}
	this.render = function (){
		if (this.show) {
			for (var i = 0; i < this.game.map.buildings.length; i++) {
				var building = this.game.map.buildings[i];
				this.ctx.beginPath();
		    	this.ctx.fillStyle = building.color;
		    	var index = i;
		    	var extraHeight = 0;
		    	/*if ((i % 3) == 1) {
		    		index -= 3;
		    		extraHeight = 73;
		    	}*/
		    	var x = this.start.x + (index*74);
		    	var y = this.start.y + extraHeight; 
		    	this.ctx.fillRect(x, y, 62, 62);
				this.ctx.fill();
			}
		}
    }
    this.init();
}